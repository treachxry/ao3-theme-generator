export function useSimulatedDocument() {
    const HTML_CLASS = 'shadow-html';
    const BODY_CLASS = 'shadow-body';

    function getDocumentStyles(): CSSStyleSheet {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(`
            :host {
                all: initial;
                display: block;
            }

            .${HTML_CLASS} {
                height: 100%;
            }

            .${BODY_CLASS} {
                height: 100%;
                overflow: auto;
            }
        `);

        return sheet;
    }

    function getDocumentRoot(html: string): HTMLElement {
        const document = parseDocument(html);

        cleanDocument(document);

        return wrapDocument(document);
    }

    function parseDocument(html: string): Document {
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }

    function cleanDocument(document: Document): void {
        document.querySelectorAll('meta, title, script, style, link').forEach(el => {
            el.remove();
        });

        document.querySelectorAll('img[src^="/images"]').forEach(el => {
            const element = el as HTMLImageElement;
            const url = new URL(element.src);

            element.src = `${__URL_BASE__}${url.pathname}`;
        });
    }

    function wrapDocument(document: Document): HTMLElement {
        const htmlWrapper = document.createElement('div');
        htmlWrapper.className = HTML_CLASS;

        const bodyWrapper = document.createElement('div');
        bodyWrapper.className = BODY_CLASS;

        htmlWrapper.appendChild(bodyWrapper);

        while(document.body.firstChild) {
            bodyWrapper.appendChild(document.body.firstChild);
        }

        return htmlWrapper;
    }

    return {
        getDocumentRoot,
        getDocumentStyles
    };
}