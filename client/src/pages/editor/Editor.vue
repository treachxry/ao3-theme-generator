<script setup lang="ts">
    import { watch } from "vue";
    import { fetchAssets, fetchPages } from "@/functions/api";
    import { useStorage } from "@/composables/useStorage";
    import { useCache } from "@/composables/useCache";
    import { useStorageRef } from "@/composables/useStorageRef";
    import { useVariableStylesheet } from "@/composables/useVariableStylesheet";
    import { createMediaQueryWrapped } from "common/functions";
    import { IHistory, useHistory } from "@/composables/useHistory";
    import { initializeSkinStore } from "@/stores/useSkinStore";
    import { initializeSchemaStore } from "@/stores/useSchemaStore";
    import { SkinChunk } from "common/models";
    import ThemeSettings from "@/pages/editor/ThemeSettings.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
    import BrowserBody from "@/pages/editor/BrowserBody.vue";
    import BrowserToolbar from "@/pages/editor/BrowserToolbar.vue";
    import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";

    initializeSkinStore('tg-skins');
    const {getDefaultVariables, getUnit} = initializeSchemaStore();

    const stylesheets = await initializeStylesheets();
    const variables = useStorageRef('tg-variables', getDefaultVariables);
    const variableStylesheet = useVariableStylesheet(variables, getUnit);

    const history = createHistory();

    const pageCache = useCache<string, string>(
        new Map<string, string>(),
        {maxItems: 16}
    );

    async function initializeStylesheets(): Promise<CSSStyleSheet[]> {
        const response = await fetchAssets();

        if(!response.ok) {
            throw new Error(`Couldn't fetch assets from server. Is the server online?`);
        }

        const stylesheetAssets: SkinChunk[] = await response.json();

        return stylesheetAssets.map(s => createMediaQueryWrapped(s.media, s.content))
    }

    async function getHtml(signal: AbortSignal): Promise<string> {
        const url: string = history.location.value;

        return pageCache.getAsync(url, async () => {
            const response = await fetchPages(url, signal);

            if(!response.ok) {
                throw new Error(`Failed to fetch page (${response.status} ${response.statusText})`);
            }

            return response.text();
        });
    }

    function createHistory(): IHistory {
        const storage = useStorage<string>(localStorage, 'tg-editor-url');
        const location = storage.getItem() ?? '/';
        const history = useHistory(location);

        watch(history.location, value => {
            storage.setItem(value);
        });

        return history;
    }

    function onNavigate(href: string): void {
        const url = new URL(href);

        // only proceed for links that are relative,
        // and therefore point to a location on the embedded site
        if(url.host !== location.host) {
            return;
        }

        const path = url.pathname + url.search + url.hash;

        history.push(path);
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <div class="overflow-y-auto min-w-64 w-64 p-3 my-2">
            <theme-settings v-model="variables"/>
        </div>

        <div class="overflow-y-auto grow">
            <div class="relative h-full flex flex-col p-2 gap-2">
                <browser-toolbar :history="history"/>

                <div class="grow overflow-auto rounded-xl border-2 shadow shadow-base-300">
                    <transition mode="out-in" name="fade">
                        <div :key="history.location.value">
                            <error-boundary>
                                <suspense timeout="0">
                                    <browser-body
                                        :getHtml="getHtml"
                                        :stylesheets="[variableStylesheet, ...stylesheets]"
                                        @navigate="onNavigate"
                                    />
                                    <template #fallback>
                                        <div class="my-8 flex flex-col gap-4 items-center">
                                            <span class="font-medium text-lg">Loading page...</span>
                                            <loading-indicator/>
                                        </div>
                                    </template>
                                </suspense>
                                <template #error="{error, clearError}">
                                    <error-panel :error="error" :clear-error="clearError"/>
                                </template>
                            </error-boundary>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>