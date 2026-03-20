import { computed, ComputedRef, Ref } from "vue";

export interface ISimulatedDocument {
    documentRoot: ComputedRef<Node>
    documentStyle: ComputedRef<CSSStyleSheet>
}

export function useSimulatedDocument(html: Readonly<Ref<string>>): ISimulatedDocument {
    const HTML_WRAPPER_CLASS = 'shadow-html';
    const BODY_WRAPPER_CLASS = 'shadow-body';

    const documentRoot = computed(getDocumentRoot);
    const documentStyle = computed(getDefaultStylesheet);

    function getDefaultStylesheet(): CSSStyleSheet {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(`
            :host {
                all: initial;
                display: block;
            }

            .${HTML_WRAPPER_CLASS} {
                height: 100%;
            }

            .${BODY_WRAPPER_CLASS} {
                height: 100%;
                overflow: auto;
            }
        `);

        return sheet;
    }

    function getDocumentRoot(): HTMLElement {
        const document = parseDocument(html.value);

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
        htmlWrapper.className = HTML_WRAPPER_CLASS;

        const bodyWrapper = document.createElement('div');
        bodyWrapper.className = BODY_WRAPPER_CLASS;

        htmlWrapper.appendChild(bodyWrapper);

        while(document.body.firstChild) {
            bodyWrapper.appendChild(document.body.firstChild);
        }

        return htmlWrapper;
    }

    return {
        documentRoot,
        documentStyle
    };
}