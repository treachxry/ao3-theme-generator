<script setup lang="ts">
    import { computed, ref } from "vue";
    import { Zap, RotateCcw, Flame } from "lucide-vue-next";
    import { createMediaQueryWrapped, createRule, createProperty, getHostUrl } from "shared/functions";
    import { useReactiveStorage } from "@/composables/UseReactiveStorage";
    import { fetchAssets, fetchTheme } from "@/functions/api";
    import { StyleSheetBundle, ThemeInfo, StyleSheetAsset, Theme } from "shared/models";
    import Browser from "@/components/Browser.vue";
    import ThemeResult from "@/components/ThemeResult.vue";
    import ThemeSettings from "@/components/ThemeSettings.vue";

    type StringMap = { [key: string]: string }

    // ------ ASSET LOADING ------

    const stylesheets = ref<StyleSheetAsset[]>();
    const theme = ref<Theme>();
    const variableValues = useReactiveStorage<StringMap>('tg-variables');

    await getAssets();

    async function getAssets(): Promise<void> {
        const response = await fetchAssets();

        if(!response.ok) {
            throw new Error(`Couldn't fetch assets from server. Is the server online?`);
        }

        const data: StyleSheetBundle = await response.json();

        stylesheets.value = data.stylesheets;
        theme.value = data.theme;

        if(!variableValues.value) {
            resetVariables();
        }
    }

    function resetVariables(): void {
        if(theme.value) {
            variableValues.value = getDefaultVariableValues(theme.value);
        }
    }

    function getDefaultVariableValues(theme: Theme): StringMap {
        const results: StringMap = {};

        theme.colors?.forEach(group => {
            group.items.forEach(p => {
                results[p.key] = p.value;
            });
        });

        theme.sizes.forEach(p => {
            results[p.key] = String(p.value);
        });

        theme.radius.forEach(p => {
            results[p.key] = String(p.value);
        });

        theme.fonts.forEach(p => {
            results[p.key] = String(p.value);
        });

        return results;
    }

    // ------ GENERATED STYLESHEETS ------

    const generatedStyleSheets = ref<StyleSheetAsset[]>();

    async function generateTheme(): Promise<void> {
        const values = getVariableValues();

        if(!values) {
            return;
        }

        const response = await fetchTheme(values);

        if(!response.ok) {
            console.error('Request failed:', response.statusText);
            return;
        }

        const data: ThemeInfo = await response.json();

        generatedStyleSheets.value = data.stylesheets;
    }

    function getVariableValues(): [string, string][] | undefined {
        if(!variableValues.value) {
            return;
        }

        return Object.entries(variableValues.value).map(v => v);
    }

    function clearGenerated() {
        generatedStyleSheets.value = undefined;
    }

    // ------ PREVIEWED STYLESHEETS ------

    const previewStyleSheets = computed<string[]>(() => {
        if(!stylesheets.value || !theme.value || !variableValues.value) {
            return [];
        }

        return getPreviewStyleSheets(stylesheets.value, theme.value, variableValues.value);
    });

    function getPreviewStyleSheets(stylesheets: StyleSheetAsset[], theme: Theme, variableValues: StringMap): string[] {
        const properties = Object.entries(variableValues).map(v => {
            const key = v[0];
            const value = `${v[1]}${getUnit(theme, key)}`

            return createProperty(key, value);
        });

        const variableStyleSheet = createRule('*', properties);

        return [
            variableStyleSheet,
            ...stylesheets.map(s => createMediaQueryWrapped(s.media, s.content))
        ];
    }

    function getUnit(theme: Theme, key: string): string {
        const size = theme.sizes.find(x => x.key === key);

        if(size) {
            return size.unit;
        }

        const radius = theme.radius.find(x => x.key === key);

        if(radius) {
            return radius.unit;
        }

        return '';
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <!-- left panel -->
        <div class="min-w-64 w-64 overflow-y-auto">
            <div class="grid gap-8 border-e border-base-300 p-3">
                <div>
                    <h3 class="flex items-center gap-2 mb-4">
                        <zap :size="16"/>
                        <span class="text-sm">Actions</span>
                        <span class="border-b grow ms-2"/>
                    </h3>
                    <div class="grid gap-2">
                        <button class="btn btn-sm btn-success justify-between" @click="generateTheme">
                            <span>Create theme</span>
                            <flame :size="16"/>
                        </button>
                        <button class="btn btn-sm btn-error btn-outline justify-between" @click="resetVariables">
                            <span>Reset all variables</span>
                            <rotate-ccw :size="16"/>
                        </button>
                    </div>
                </div>

                <theme-result
                    v-if="generatedStyleSheets"
                    :stylesheets="generatedStyleSheets"
                    @clear="clearGenerated"
                />

                <theme-settings
                    v-if="theme && variableValues"
                    :theme="theme"
                    v-model="variableValues"
                />
            </div>
        </div>

        <!-- right panel -->
        <div class="grow overflow-auto">
            <browser
                :stylesheets="previewStyleSheets"
                :base-url="getHostUrl()"
            />
        </div>
    </div>
</template>