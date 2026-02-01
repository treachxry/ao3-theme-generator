import { StyleSheetAsset, Theme } from "shared/models";
import { createProperty, createRule } from "shared/functions";

export function themeToVariableMap(theme: Theme): Record<string, string> {
    const results: Record<string, string> = {};

    theme.colors?.forEach(group => {
        group.items.forEach(p => {
            results[p.key] = p.value;
        });
    });

    theme.sizes.forEach(p => {
        results[p.key] = String(p.value);
    });

    theme.radius.forEach(p => {
        results[p.key] = String(p.value);
    });

    theme.fonts.forEach(p => {
        results[p.key] = String(p.value);
    });

    return results;
}

export function getPreviewStyleSheets(stylesheets: StyleSheetAsset[], theme: Theme, variableValues: Record<string, string>): CSSStyleSheet[] {
    const properties = Object.entries(variableValues).map(v => {
        const key = v[0];
        const value = `${v[1]}${getUnit(theme, key)}`

        return createProperty(key, value);
    });

    const sheet = new CSSStyleSheet();

    sheet.replaceSync(createRule('*', properties));

    return [
        sheet,
        ...stylesheets.map(s => createMediaQueryWrapped(s.media, s.content))
    ];
}

function createMediaQueryWrapped(media: string, rules: string): CSSStyleSheet {
    const sheet = new CSSStyleSheet();

    sheet.replaceSync(rules);
    sheet.media.appendMedium(media);

    return sheet;
}

function getUnit(theme: Theme, key: string): string {
    const size = theme.sizes.find(x => x.key === key);

    if(size) {
        return size.unit;
    }

    const radius = theme.radius.find(x => x.key === key);

    if(radius) {
        return radius.unit;
    }

    return '';
}