import { join } from "node:path";
import { readServerAsset, writeServerAsset } from "@/services/assets.service";
import { AppContext } from "@/models/AppContext";

export function getAO3Url() {
    return 'https://archiveofourown.org';
}

export async function readPageAsset(context: AppContext, url: string): Promise<Response> {
    const path = getPagePath(url);
    return readServerAsset(context, path);
}

export async function writePageAsset(url: string, html: string): Promise<void> {
    const path = getPagePath(url);
    await writeServerAsset(path, html);
}

function getPagePath(url: string): string {
    const filename = encodePageName(url);
    return join('/pages', filename);
}

function encodePageName(name: string): string {
    const characters = [];

    for(let i = 0; i < name.length; i++) {
        const hex = name.charCodeAt(i).toString(16).padStart(2,'0');
        characters.push(hex);
    }

    return `${characters.join('')}.html`;
}