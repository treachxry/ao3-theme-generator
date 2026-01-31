import { StyleSheetAssetInfo, StyleSheetAsset, StyleSheetImportance, Theme } from "shared/models";
import { createProperty, createRule, mergeRules } from "shared/functions";
import { join } from "node:path";
import postcss from "postcss";
import { AppContext } from "@/models/AppContext";
import { CssAssetType } from "@/models/CssAssetType";
import { readServerAsset } from "@/services/assets.service";
import { getPlugins } from "@/functions/css-plugins";

export function getTheme(): Theme {
    return theme;
}

export async function generateCss(c: AppContext, variables: string[][]): Promise<StyleSheetAsset[]> {
    const assetType = CssAssetType.RAW;
    const properties = variables.map(v => createProperty(v[0], v[1]));
    const plugins = getPlugins({type: assetType})

    const variableRule = createRule(':root', properties);
    const postCss = postcss(plugins);
    const assets = await readStyleAssets(c, assetType);

    return Promise.all(assets.map(async file => {
        const css = mergeRules(variableRule, file.content);
        const processedCss = await postCss.process(css, {from: undefined});

        return {
            ...file,
            content: processedCss.css
        } satisfies StyleSheetAsset;
    }));
}

export async function readStyleAssets(context: AppContext, type: CssAssetType): Promise<StyleSheetAsset[]> {
    const directory = `/${type}`;

    const stylesheets = await Promise.all(sheets.map(s => {
        return readStyleAsset(context, directory, s);
    }));

    return stylesheets.filter(s => s !== undefined);
}

async function readStyleAsset(context: AppContext, directory: string, file: StyleSheetAssetInfo): Promise<StyleSheetAsset | undefined> {
    const path = join(directory, file.filename);
    const response = await readServerAsset(context, path);

    if(!response.ok) {
        return;
    }

    return {
        ...file,
        content: await response.text()
    };
}

const theme: Theme = {
    colors: [
        {
            name: 'base',
            items: [
                {
                    key: '--color-base-100',
                    value: '#0b0e0f',
                    label: '100'
                },
                {
                    key: '--color-base-200',
                    value: '#141618',
                    label: '200'
                },
                {
                    key: '--color-base-300',
                    value: '#1d2021',
                    label: '300'
                },
                {
                    key: '--color-base-content',
                    value: '#d5d8db',
                    isContent: true
                }
            ]
        },
        {
            name: 'primary',
            items: [
                {
                    key: '--color-primary',
                    value: '#8f0000',
                },
                {
                    key: '--color-primary-content',
                    value: '#d5d8db',
                    isContent: true
                }
            ]
        },
        {
            name: 'secondary',
            items: [
                {
                    key: '--color-secondary',
                    value: '#e59b5b',
                },
                {
                    key: '--color-secondary-content',
                    value: '#130600',
                    isContent: true
                }
            ]
        },
        {
            name: 'accent',
            items: [
                {
                    key: '--color-accent',
                    value: '#b88cd9',
                },
                {
                    key: '--color-accent-content',
                    value: '#0b0615',
                    isContent: true
                }
            ]
        },
        {
            name: 'neutral',
            items: [
                {
                    key: '--color-neutral',
                    value: '#22272b',
                },
                {
                    key: '--color-neutral-content',
                    value: '#999fa4',
                    isContent: true
                }
            ]
        },
        {
            name: 'info',
            items: [
                {
                    key: '--color-info',
                    value: '#87dee9',
                },
                {
                    key: '--color-info-content',
                    value: '#061213',
                    isContent: true
                }
            ]
        },
        {
            name: 'success',
            items: [
                {
                    key: '--color-success',
                    value: '#abddac',
                },
                {
                    key: '--color-success-content',
                    value: '#0b110b',
                    isContent: true
                },
            ]
        },
        {
            name: 'warning',
            items: [
                {
                    key: '--color-warning',
                    value: '#efc68f',
                },
                {
                    key: '--color-warning-content',
                    value: '#130f08',
                    isContent: true
                }
            ]
        },
        {
            name: 'error',
            items: [
                {
                    key: '--color-error',
                    value: '#ffb8bb',
                },
                {
                    key: '--color-error-content',
                    value: '#150d0d',
                    isContent: true
                }
            ]
        }
    ],
    fonts: [
        {
            key: '--font-serif',
            value: "'Georgia', serif",
            name: 'Serif font'
        },
        {
            key: '--font-sans',
            value: "'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica', sans-serif, 'GNU Unifont'",
            name: 'Sans-serif font'
        },
        {
            key: '--font-mono',
            value: "'Monaco', 'Consolas', 'Courier', monospace",
            name: 'Monospace font'
        }
    ],
    radius: [
        {
            key: '--ui-roundness',
            name: 'Roundness',
            value: 2,
            unit: 'px',
            description: 'Border radius',
            possibleValues: [0, 0.5, 1, 2, 3, 4]
        }
    ],
    sizes: [
        {
            key: '--ui-density',
            name: 'Density',
            value: 2,
            unit: 'px',
            description: 'Spacing',
            min: 0,
            max: 5,
            step: 1
        },
        {
            key: '--ui-border',
            name: 'Border',
            value: 1,
            unit: 'px',
            description: 'Border width',
            min: 1,
            max: 3,
            step: 1
        }
    ]
}

const sheets: StyleSheetAssetInfo[] = [
    {
        description: 'General',
        media: 'all',
        filename: 'media-all.css',
        importance: StyleSheetImportance.Required,
    },
    {
        description: 'Midsize',
        media: 'only screen and (max-width: 62em)',
        filename: 'media-midsize.css',
        importance: StyleSheetImportance.Recommended,
    },
    {
        description: 'Narrow',
        media: 'only screen and (max-width: 42em)',
        filename: 'media-narrow.css',
        importance: StyleSheetImportance.Required,
    },
    {
        description: 'Speech',
        media: 'speech',
        filename: 'media-aural.css',
        importance: StyleSheetImportance.Optional,
    },
    {
        description: 'Print',
        media: 'print',
        filename: 'media-print.css',
        importance: StyleSheetImportance.Optional
    }
];