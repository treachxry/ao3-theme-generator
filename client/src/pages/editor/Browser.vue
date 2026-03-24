<script setup lang="ts">
    import { fetchPages } from "@/functions/api";
    import { ICache, useCache } from "@/composables/useCache";
    import { IHistory } from "@/composables/useHistory";
    import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import BrowserBody from "@/pages/editor/BrowserBody.vue";

    const {history, stylesheets = [], cacheSize} = defineProps<{
        history: IHistory
        stylesheets?: CSSStyleSheet[]
        cacheSize?: number
    }>();

    const cache: ICache<string, string> | undefined = createCache();

    async function getHtml(signal: AbortSignal): Promise<string> {
        const url: string = history.location.value;

        if(!cache) {
            return fetchHtml(url, signal);
        }

        return cache.getAsync(url, () => fetchHtml(url, signal));
    }

    async function fetchHtml(url: string, signal: AbortSignal): Promise<string> {
        const response = await fetchPages(url, signal);

        if(!response.ok) {
            throw new Error(`Failed to fetch page (${response.status} ${response.statusText})`);
        }

        return response.text();
    }

    function createCache(): ICache<string, string> | undefined {
        if(!cacheSize || cacheSize <= 0) {
            return;
        }

        return useCache<string, string>(
            new Map<string, string>(),
            {maxItems: 16}
        );
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
    <transition mode="out-in" name="fade">
        <div :key="history.location.value">
            <error-boundary>
                <suspense timeout="0">
                    <browser-body
                        :getHtml="getHtml"
                        :stylesheets="stylesheets"
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
</template>