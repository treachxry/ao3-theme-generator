<script setup lang="ts">
    import { onMounted, useTemplateRef } from "vue";

    const {html, css} = defineProps<{
        html: string
        css?: string
    }>();

    const containerEl = useTemplateRef('container');

    onMounted(async () => {
        const shadowRoot = initShadowRoot(containerEl.value!, `
            <div class="__html_placeholder__">
                <div class="__body_placeholder__">
                    ${html}
                </div>
            </div>
        `);

        await addStyleSheet(shadowRoot, `
            :host {
                all:initial;
                display:block;
            }

            .__html_placeholder__ {
                height: 100%;
            }

            .__body_placeholder__ {
                height: 100%;
                overflow: auto;
            }
        `);

        if(css) {
            await addStyleSheet(shadowRoot, css);
        }
    });

    function initShadowRoot(element: Element, html: string): ShadowRoot {
        const shadowRoot = element.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = html;

        return shadowRoot;
    }

    async function addStyleSheet(shadowRoot: ShadowRoot, css: string) {
        const sheet = new CSSStyleSheet();
        await sheet.replace(css);
        shadowRoot.adoptedStyleSheets.push(sheet);
    }
</script>

<template>
    <div
        ref="container"
        class="shadow-dom"
    />
</template>

<style scoped>
    .shadow-dom {
        pointer-events: none;
        user-select: none;
    }
</style>