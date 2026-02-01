<script setup lang="ts">
    import { computed, nextTick, ref } from "vue";
    import { Zap, RotateCcw, Flame, Ban } from "lucide-vue-next";
    import { getHostUrl } from "shared/functions";
    import { useReactiveStorage } from "@/composables/UseReactiveStorage";
    import { fetchAssets } from "@/functions/api";
    import { getPreviewStyleSheets, themeToVariableMap } from "@/functions/css";
    import { StyleSheetBundle, StyleSheetAsset, Theme } from "shared/models";
    import Browser from "@/components/Browser.vue";
    import ThemeResult from "@/components/ThemeResult.vue";
    import ThemeSettings from "@/components/ThemeSettings.vue";
    import ErrorBoundary from "@/components/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ErrorPanel.vue";
    import LoadingIndicator from "@/components/LoadingIndicator.vue";

    const {stylesheets, theme} = await initializeAssets();
    const variableValues = useReactiveStorage('tg-variables', getVariableMap);
    const previewStyles = computed<CSSStyleSheet[]>(getPreviewStyles);
    const hasOutput = ref<boolean>(false);

    async function initializeAssets() {
        const response = await fetchAssets();

        if(!response.ok) {
            throw new Error(`Couldn't fetch assets from server. Is the server online?`);
        }

        const data: StyleSheetBundle = await response.json();

        return {
            stylesheets: ref<StyleSheetAsset[]>(data.stylesheets),
            theme: ref<Theme>(data.theme)
        }
    }

    async function onThemeCreate(): Promise<void> {
        hasOutput.value = false;
        await nextTick();
        hasOutput.value = true;
    }

    function onThemeDiscard(): void {
        hasOutput.value = false;
    }

    function onThemeReset(): void {
        variableValues.value = getVariableMap();
    }

    function getPreviewStyles(): CSSStyleSheet[] {
        if(!stylesheets.value || !theme.value || !variableValues.value) {
            return [];
        }

        return getPreviewStyleSheets(stylesheets.value, theme.value, variableValues.value);
    }

    function getVariableMap() {
        return themeToVariableMap(theme.value);
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <div class="min-w-64 w-64 overflow-y-auto my-2">
            <div class="grid gap-8 p-3">
                <div>
                    <h3 class="sidebar-divider">
                        <zap/>
                        <span>Actions</span>
                    </h3>
                    <div class="grid gap-2">
                        <button class="btn btn-sm btn-success justify-between" @click="onThemeCreate">
                            <span>Create theme</span>
                            <flame/>
                        </button>
                        <button class="btn btn-sm btn-error btn-outline justify-between" @click="onThemeReset">
                            <span>Reset all variables</span>
                            <rotate-ccw/>
                        </button>
                    </div>
                </div>

                <error-boundary>
                    <suspense timeout="0">
                        <theme-result
                            v-if="hasOutput"
                            :variables="variableValues"
                            @clear="onThemeDiscard"
                        />
                        <template #fallback>
                            <div class="flex gap-4 justify-center items-center py-4 rounded-xl bg-base-200">
                                <div>
                                    <loading-indicator/>
                                </div>
                                <button @click="onThemeDiscard" class="btn btn-warning btn-sm btn-outline justify-between">
                                    <span>Cancel</span>
                                    <ban/>
                                </button>
                            </div>
                        </template>
                    </suspense>
                    <template #error="{error, clearError}">
                        <error-panel :error="error" :clear-error="clearError"/>
                    </template>
                </error-boundary>

                <theme-settings
                    :theme="theme"
                    v-model="variableValues"
                />
            </div>
        </div>

        <div class="grow overflow-auto">
            <browser
                :stylesheets="previewStyles"
                :base-url="getHostUrl()"
            />
        </div>
    </div>
</template>