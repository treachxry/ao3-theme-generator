<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from "vue";
    import { fetchPages } from "@/functions/api";
    import { useAbort } from "@/composables/UseAbort";
    import { HtmlAsset } from "shared/models";
    import ShadowDomRenderer from "@/components/ShadowDomRenderer.vue";

    const HTML_CLASS = 'shadow-html';
    const BODY_CLASS = 'shadow-body';

    const {url, stylesheets, onNavigate} = defineProps<{
        url: string,
        stylesheets: string[]
        onNavigate: (url: string) => void
    }>()

    const {runAbortable, controller} = useAbort();
    const documentRoot = ref<Node | undefined>(await fetchHtml());
    const documentStyles = ref<CSSStyleSheet[]>(await getStyles());

    onBeforeUnmount(() => {
        controller.abort();
    });

    watch(() => stylesheets, async () => {
        documentStyles.value = await getStyles();
    });

    async function fetchHtml(): Promise<Node | undefined> {
        return await runAbortable(async () => {
            const response = await fetchPages(url, controller);

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data: HtmlAsset = await response.json();

            return processHtml(data.content);
        });
    }

    async function getStyles(): Promise<CSSStyleSheet[]> {
        const stylesAsStrings: string[] = [
            getDefaultShadowDomStyles(),
            ...stylesheets
        ];

        return Promise.all(stylesAsStrings.map(styleSheetFromString));
    }

    async function styleSheetFromString(css: string): Promise<CSSStyleSheet> {
        const sheet = new CSSStyleSheet();
        return sheet.replace(css);
    }

    function getDefaultShadowDomStyles(): string {
        return `
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
        `;
    }

    function processHtml(html: string): HTMLElement {
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
</script>

<template>
    <shadow-dom-renderer
        v-if="documentRoot"
        :root-node="documentRoot"
        :style-sheets="documentStyles"
        @navigate="onNavigate"
    />
</template>