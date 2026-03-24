<script setup lang="ts">
    import { watch } from "vue";
    import { fetchAssets } from "@/functions/api";
    import { useStorage } from "@/composables/useStorage";
    import { useStorageRef } from "@/composables/useStorageRef";
    import { IHistory, useHistory } from "@/composables/useHistory";
    import { initializeSkinStore } from "@/stores/useSkinStore";
    import { initializeSchemaStore } from "@/stores/useSchemaStore";
    import { GeneratedSkin } from "@/models/GeneratedSkin";
    import { SkinChunk } from "common/models";
    import ThemeSettings from "@/pages/editor/ThemeSettings.vue";
    import BrowserToolbar from "@/pages/editor/BrowserToolbar.vue";
    import Browser from "@/pages/editor/Browser.vue";

    const {} = initializeSkinStore(useStorageRef<GeneratedSkin[]>('tg-editor-skins', () => []));
    const {variables, stylesheets} = initializeSchemaStore(await getStylesheets());
    const history = createHistory('tg-editor-url');

    async function getStylesheets(): Promise<SkinChunk[]> {
        const response = await fetchAssets();

        if(!response.ok) {
            throw new Error(`Couldn't fetch assets from server. Is the server online?`);
        }

        return await response.json();
    }

    function createHistory(storageKey: string): IHistory {
        const storage = useStorage<string>(localStorage, storageKey);
        const history = useHistory(storage.getItem() ?? '/');

        watch(history.location, value => {
            storage.setItem(value);
        });

        return history;
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <div class="overflow-y-auto min-w-64 w-64 p-3 my-2">
            <theme-settings v-model="variables"/>
        </div>

        <div class="overflow-y-auto grow">
            <div class="relative h-full flex flex-col p-2 gap-2">
                <browser-toolbar
                    :history="history"
                />

                <div class="grow overflow-auto rounded-xl border-2 shadow shadow-base-300">
                    <browser
                        :history="history"
                        :stylesheets="stylesheets"
                        :cache-size="16"
                    />
                </div>
            </div>
        </div>
    </div>
</template>