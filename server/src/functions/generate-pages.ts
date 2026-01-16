import { JSDOM } from "jsdom";
import {writeFile} from "node:fs/promises";
import { join } from "node:path";
import { encodePageName } from "../functions/encode.ts";

const previewConfig = {
    site: 'https://www.archiveofourown.com',
    pages: [
        '/',
        '/works'
    ]
}

export async function generatePages() {
    const pages = await fetchPages();

    for(const [url, dom] of pages) {
        const path = join('.server-assets', encodePageName(url));
        const html = dom.serialize();

        await writeFile(path, html, 'utf-8');
    }
}

async function fetchPages() {
    const pages = new Map();

    for(const page of previewConfig.pages) {
        try {
            const url = previewConfig.site + page;
            const dom = await createDom(url);

            cleanDocument(dom);
            pages.set(page, dom);

            console.log(`Prepared "${page}"`);
        }
        catch(err) {
            console.error(`Error processing ${page}:`, err instanceof Error ? err.message : String(err));
        }
    }

    return pages;
}

async function createDom(url: string): Promise<JSDOM> {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Failed to fetch resource (${res.status}), ${res.statusText}`);
    }

    const html = await res.text();

    return new JSDOM(html, {url});
}

function cleanDocument(dom: JSDOM): void {
    const doc = dom.window.document;

    doc.querySelectorAll('head')
        .forEach(el => el.remove());

    // remove scripts
    doc.querySelectorAll('script')
        .forEach(el => el.remove());

    // remove referenced stylesheets
    doc.querySelectorAll('link[rel="stylesheet"]')
        .forEach(el => el.remove());

    // remove inline stylesheets
    doc.querySelectorAll('style')
        .forEach(el => el.remove());
}