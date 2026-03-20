import { computed, ComputedRef, Ref } from "vue";
import { createProperty, createRule } from "common/functions";

export function useVariableStylesheet(variables: Readonly<Ref<Record<string, string>>>, getUnit: (key: string) => string): ComputedRef<CSSStyleSheet> {
    function createStyleSheet(): CSSStyleSheet {
        const entries = Object.entries(variables.value);
        const properties = entries.map(toProperty);

        return toStylesheet(properties);
    }

    function toProperty(entry: [string, string]): string {
        const [key, value] = entry;

        const unit = getUnit(key);
        const valueWithUnit = `${value}${unit}`

        return createProperty(key, valueWithUnit);
    }

    function toStylesheet(properties: string[]): CSSStyleSheet {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(createRule('*', properties));

        return sheet;
    }

    return computed(createStyleSheet);
}