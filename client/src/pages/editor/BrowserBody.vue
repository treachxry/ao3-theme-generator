<script setup lang="ts">
    import { ref } from "vue";
    import { useAbortable, IAbortableCallback } from "@/composables/useAbortable";
    import { useSimulatedDocument } from "@/composables/useSimulatedDocument";
    import ShadowDomRenderer from "@/components/ShadowDomRenderer.vue";

    const {stylesheets, getHtml} = defineProps<{
        stylesheets: CSSStyleSheet[]
        getHtml: IAbortableCallback<string>
    }>();

    const emits = defineEmits<{
        (e: 'navigate', url: string): void
    }>();

    const html = ref(await useAbortable(getHtml));
    const {documentRoot, documentStyle} = useSimulatedDocument(html);

    function onNavigate(url: string): void {
        emits('navigate', url);
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