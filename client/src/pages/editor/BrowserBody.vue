<script setup lang="ts">
    import { ref } from "vue";
    import { fetchPages } from "@/functions/api";
    import { useAbortable } from "@/composables/useAbortable";
    import { useSimulatedDocument } from "@/composables/useSimulatedDocument";
    import ShadowDomRenderer from "@/components/ShadowDomRenderer.vue";

    const {stylesheets} = defineProps<{
        stylesheets: CSSStyleSheet[]
    }>()

    const url = defineModel<string>({
        required: true
    });

    const html = ref(await useAbortable(fetchHtml));
    const {documentRoot, documentStyle} = useSimulatedDocument(html);

    async function fetchHtml(signal: AbortSignal): Promise<string> {
        const response = await fetchPages(url.value, signal);

        if(!response.ok) {
            throw new Error(`Failed to fetch page (${response.status} ${response.statusText})`);
        }

        return response.text();
    }

    function onNavigate(value: string): void {
        const u = new URL(value);

        url.value = u.pathname + u.search;
    }
</script>

<template>
    <shadow-dom-renderer
        :root-node="documentRoot"
        :style-sheets="[documentStyle, ...stylesheets]"
        @navigate="onNavigate"
        class="z-0 relative"
    />
</template>