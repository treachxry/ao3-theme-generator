<script setup lang="ts">
    import { computed, onBeforeUnmount } from "vue";
    import { fetchPages } from "@/functions/api";
    import { useAbort } from "@/composables/useAbort";
    import { useSimulatedDocument } from "@/composables/useSimulatedDocument";
    import ShadowDomRenderer from "@/components/ShadowDomRenderer.vue";

    const {stylesheets} = defineProps<{
        stylesheets: CSSStyleSheet[]
    }>()

    const url = defineModel<string>({
        required: true
    });

    const {runAbortable, abort} = useAbort();
    const {getDocumentRoot, getDocumentStyles} = useSimulatedDocument();

    const html: string = await fetchHtml();
    const documentRoot: Node = getDocumentRoot(html);
    const documentStyles = computed<CSSStyleSheet[]>(() => [getDocumentStyles(), ...stylesheets]);

    onBeforeUnmount(() => {
        abort();
    });

    function onNavigate(value: string) {
        const u = new URL(value);

        url.value = u.pathname + u.search;
    }

    async function fetchHtml(): Promise<string> {
        const result = await runAbortable(async signal => {
            const response = await fetchPages(url.value, signal);

            if(!response.ok) {
                throw new Error(`Failed to fetch page (${response.status} ${response.statusText})`);
            }

            return response.text();
        });

        if(!result) {
            throw new Error('Failed to fetch page (operation aborted)');
        }

        return result;
    }
</script>

<template>
    <shadow-dom-renderer
        :root-node="documentRoot"
        :style-sheets="documentStyles"
        @navigate="onNavigate"
        class="z-0 relative"
    />
</template>