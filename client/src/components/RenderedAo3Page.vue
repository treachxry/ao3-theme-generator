<script setup lang="ts">
    import RenderedContent from "@/components/RenderedContent.vue";

    const {url = '', html = '', stylesheets = []} = defineProps<{
        url?: string
        html?: string
        stylesheets?: string[]
    }>();
</script>

<template>
    <div class="mockup-browser border-base-300 border bg-base-content/5">
        <div class="mockup-browser-toolbar">
            <div class="input">{{ url }}</div>
        </div>
        <rendered-content
            :html="html"
            :stylesheets="stylesheets"
            class="h-200"
        />
    </div>
</template>