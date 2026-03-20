<script setup lang="ts">
    import { fetchAssets } from "@/functions/api";
    import { initializeEditorStore } from "@/stores/useEditorStore";
    import { CssAssetBundle } from "common/models";
    import Browser from "@/pages/editor/Browser.vue";
    import ThemeSettings from "@/pages/editor/ThemeSettings.vue";

    const assets = await initializeAssets();
    const {previewStyles} = initializeEditorStore(assets);

    async function initializeAssets(): Promise<CssAssetBundle> {
        const response = await fetchAssets();

        if(!response.ok) {
            throw new Error(`Couldn't fetch assets from server. Is the server online?`);
        }

        return response.json();
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <div class="overflow-y-auto min-w-64 w-64 p-3 my-2">
            <theme-settings/>
        </div>

        <div class="overflow-y-auto grow">
            <browser :stylesheets="previewStyles"/>
        </div>
    </div>
</template>