<script setup lang="ts">
    import { ref, useTemplateRef, watch, onMounted } from "vue";

    const {rootNode, styleSheets} = defineProps<{
        rootNode: Node
        styleSheets: CSSStyleSheet[]
    }>();

    const emits = defineEmits<{
        (e: 'navigate', url: string): void
    }>();

    const containerEl = useTemplateRef('container');
    const shadowRoot = ref<ShadowRoot>();

    onMounted(onInitialize);
    watch(() => styleSheets, onStyleChange);

    function onInitialize(): void {
        if(!containerEl.value) {
            return;
        }

        shadowRoot.value = containerEl.value.attachShadow({mode: 'open'});
        shadowRoot.value.replaceChildren(rootNode);
        shadowRoot.value.addEventListener('click', onClickEvent);

        onStyleChange(styleSheets);
    }

    function onNavigate(url: string): void {
        emits('navigate', url);
    }

    function onStyleChange(stylesheets: CSSStyleSheet[]): void {
        if(!shadowRoot.value) {
            return;
        }

        shadowRoot.value.adoptedStyleSheets = stylesheets;
    }

    function onClickEvent(e: Event): void {
        e.preventDefault();

        if(!(e.target instanceof Element)) {
            return;
        }

        const link = e.target.closest('a');

        if(!(link instanceof HTMLAnchorElement) || !link.href) {
            return;
        }

        const url = new URL(link.href);

        onNavigate(url.pathname);
    }
</script>

<template>
    <div ref="container"/>
</template>