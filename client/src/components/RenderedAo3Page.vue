<script setup lang="ts">
    import RenderedContent from "@/components/RenderedContent.vue";
    import { useTemplateRef } from "vue";

    const {url = '', html = '', stylesheets = []} = defineProps<{
        url?: string
        html?: string
        stylesheets?: string[]
    }>();

    const emits = defineEmits<{
        (e: 'updateUrl', value: string): void
    }>();

    const urlElement = useTemplateRef('url-input');

    function onKeyDown(e: KeyboardEvent) {
        if(e.key === 'Enter') {
            updateUrl();
        }
    }

    function updateUrl() {
        const value = urlElement.value?.value;

        if(!value || value === url) {
            return;
        }

        emits('updateUrl', value);
    }
</script>

<template>
    <div class="mockup-browser border-base-300 border bg-base-content/5">
        <div class="mockup-browser-toolbar">
            <input
                ref="url-input"
                type="text"
                class="input outline-0"
                :value="url"
                @focusout="updateUrl"
                @keydown="onKeyDown"
            />
        </div>
        <rendered-content
            :html="html"
            :stylesheets="stylesheets"
            class="h-200"
        />
    </div>
</template>