import { Ref } from "vue";
import { SkinSchema } from "common/models";

export interface ISkinSchema {
    getDefaultVariables: () => Record<string, string>
    getUnit: (key: string) => string
}

export function useSkinSchema(schema: Readonly<Ref<SkinSchema>>): ISkinSchema {
    function getDefaultVariables(): Record<string, string> {
        const results: Record<string, string> = {};

        schema.value.colors.forEach(group => {
            group.items.forEach(p => {
                results[p.key] = p.value;
            });
        });

        schema.value.sizes.forEach(p => {
            results[p.key] = String(p.value);
        });

        schema.value.radius.forEach(p => {
            results[p.key] = String(p.value);
        });

        schema.value.fonts.forEach(p => {
            results[p.key] = String(p.value);
        });

        return results;
    }

    function getUnit(key: string): string {
        const size = schema.value.sizes.find(x => x.key === key);

        if(size) {
            return size.unit;
        }

        const radius = schema.value.radius.find(x => x.key === key);

        if(radius) {
            return radius.unit;
        }

        return '';
    }

    return {
        getDefaultVariables,
        getUnit
    };
}