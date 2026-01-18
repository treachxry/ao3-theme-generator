import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { AppContext } from "@/models/AppContext";

export async function readServerAsset(context: AppContext, path: string): Promise<Response> {
    const url = new URL(path, context.req.url);
    return context.env.ASSETS.fetch(url);
}

export async function writeServerAsset(path: string, data: string): Promise<void> {
    const fullPath = join('.server-assets', path);
    const directory = dirname(fullPath);

    await mkdir(directory, {recursive: true});
    await writeFile(fullPath, data, 'utf-8');

    console.log('[SERVER ASSETS]', 'Created', fullPath);
}