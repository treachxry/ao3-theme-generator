import postcss from "postcss";
import { SkinChunk, ChunkImportance } from "common/models";
import { join } from "node:path";
import { createProperty, createRule, mergeRules } from "common/functions";
import { AppContext } from "@/models/AppContext";
import { GenerateTaskType } from "@/models/GenerateTaskType";
import { CssAssetInfo } from "@/models/CssAssetInfo";
import { readServerAsset } from "@/services/assets.service";
import { getPlugins } from "@/functions/css-plugins";

export async function generateCss(c: AppContext, variables: string[][], options: {} = {}): Promise<SkinChunk[]> {
    const assetType = GenerateTaskType.Raw;
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
        };
    }));
}

export async function readStyleAssets(context: AppContext, type: GenerateTaskType): Promise<SkinChunk[]> {
    const directory = `/${type}`;

    const stylesheets = await Promise.all(sheets.map(s => {
        return readStyleAsset(context, directory, s);
    }));

    return stylesheets.filter(s => s !== undefined);
}

async function readStyleAsset(context: AppContext, directory: string, file: CssAssetInfo): Promise<SkinChunk | undefined> {
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

const sheets: CssAssetInfo[] = [
    {
        description: 'General',
        media: 'all',
        filename: 'media-all.css',
        importance: ChunkImportance.Required,
    },
    {
        description: 'Midsize',
        media: 'only screen and (max-width: 62em)',
        filename: 'media-midsize.css',
        importance: ChunkImportance.Recommended,
    },
    {
        description: 'Narrow',
        media: 'only screen and (max-width: 42em)',
        filename: 'media-narrow.css',
        importance: ChunkImportance.Required,
    },
    {
        description: 'Speech',
        media: 'speech',
        filename: 'media-aural.css',
        importance: ChunkImportance.Optional,
    },
    {
        description: 'Print',
        media: 'print',
        filename: 'media-print.css',
        importance: ChunkImportance.Optional
    }
];