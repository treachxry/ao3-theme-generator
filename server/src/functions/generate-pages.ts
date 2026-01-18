import { JSDOM } from "jsdom";
import { getAO3Url, writePageAsset } from "@/services/pages.service";

export async function generatePages(pages: string[]) {
    for(const page of pages) {
        try {
            const url = new URL(page, getAO3Url());
            const dom = await createDocument(url);

            cleanDocument(dom);

            const html = dom.serialize();

            await writePageAsset(page, html);
        }
        catch(err) {
            console.error(`Error processing ${page}:`, err instanceof Error ? err.message : String(err));
        }
    }
}

async function createDocument(url: URL): Promise<JSDOM> {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Failed to fetch resource (${response.status}), ${response.statusText}`);
    }

    const html = await response.text();

    return new JSDOM(html, {
        url: url.href
    });
}

function cleanDocument(dom: JSDOM): void {
    const doc = dom.window.document;

    // remove head element
    doc.querySelectorAll('head').forEach(el => {
        el.remove();
    });

    // remove scripts
    doc.querySelectorAll('script').forEach(el => {
        el.remove();
    });

    // remove referenced stylesheets
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        el.remove();
    });

    // remove inline stylesheets
    doc.querySelectorAll('style').forEach(el => {
        el.remove();
    });

    // fix image paths
    doc.querySelectorAll('img[src^="/images"]').forEach(el => {
        const element = el as HTMLImageElement;
        const url = new URL(element.src);

        element.src = `/ao3-theme-generator${url.pathname}`;
    });

    // fix navigation links
    doc.querySelectorAll('a[href]').forEach(el => {
        const element = el as HTMLLinkElement;
        const url = new URL(element.href);

        element.removeAttribute('href');

        if(url.host !== dom.window.location.host) {
            return;
        }

        element.dataset.navLink = 'true';
        element.dataset.navHref = url.pathname;
    });
}