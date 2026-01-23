<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import { StyleSheetBundle, ThemeInfo, StyleSheetAsset, CssVariableInfo } from "shared/models";
    import { createMediaQueryWrapped, createRule, createProperty, getHostUrl } from "shared/functions";
    import { useReactiveStorage } from "@/composables/UseReactiveStorage.ts";
    import { fetchAssets, fetchTheme } from "@/functions/api.ts";
    import Page from "@/components/Page.vue";
    import ThemeResult from "@/components/ThemeResult.vue";
    import VariableSettings from "@/components/VariableSettings.vue";

    // ------ PAGE PREVIEWS ------

    const url = useReactiveStorage<string>('tg-page-url', () => '/works');

    // ------ ASSET LOADING ------

    const assetStyleSheets = ref<StyleSheetAsset[]>();
    const assetVariables = ref<CssVariableInfo[]>();
    const variableValues = useReactiveStorage<string[]>('tg-variables');

    onMounted(async () => {
        await getAssets();
    })

    async function getAssets() {
        const response = await fetchAssets();

        if(!response.ok) {
            console.error('Request failed:', response.statusText);
            return;
        }

        const data: StyleSheetBundle = await response.json();

        assetVariables.value = data.variables;
        assetStyleSheets.value = data.stylesheets;

        if(!variableValues.value) {
            resetVariables();
        }
    }

    function resetVariables() {
        variableValues.value = getDefaultVariableValues();
    }

    function getDefaultVariableValues() {
        return assetVariables.value?.map(v => v.default) ?? null;
    }

    // ------ GENERATED STYLESHEETS ------

    const generatedStyleSheets = ref<StyleSheetAsset[]>();

    async function generateTheme() {
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

    function getVariableValues() {
        if(!assetVariables.value || !variableValues.value) {
            return;
        }

        const results: [string, string][] = [];

        for(let i = 0; i < assetVariables.value.length; i++) {
            const key = assetVariables.value[i]!.key;
            const value = variableValues.value[i] ?? assetVariables.value[i]!.default;

            results.push([key, value])
        }

        return results;
    }

    function clearGenerated() {
        generatedStyleSheets.value = undefined;
    }

    // ------ PREVIEWED STYLESHEETS ------

    const previewStyleSheets = computed<string[]>(() => {
        if(!assetStyleSheets.value || !assetVariables.value || !variableValues.value) {
            return [];
        }

        return getPreviewStyleSheets(assetStyleSheets.value, assetVariables.value, variableValues.value);
    });

    function getPreviewStyleSheets(stylesheets: StyleSheetAsset[], variables: CssVariableInfo[], variableValues: string[]): string[] {
        const properties = variables.map((v, i) => getVariableProperty(v, variableValues[i]));
        const variableStyleSheet = createRule('*', properties);

        return [
            variableStyleSheet,
            ...stylesheets.map(s => createMediaQueryWrapped(s.media, s.content))
        ];
    }

    function getVariableProperty(variableInfo: CssVariableInfo, definedValue?: string): string {
        const unit = variableInfo.unit ?? '';
        const value = definedValue ?? variableInfo.default;

        return createProperty(variableInfo.key, `${value}${unit}`)
    }
</script>

<template>
    <div class="absolute inset-0 flex">
        <!-- left panel -->
        <div class="w-72 overflow-auto">
            <div class="sidebar border-base-300 border-e p-3">
                <div class="grid gap-2">
                    <button class="btn btn-sm btn-success btn-outline" @click="generateTheme">Generate theme</button>
                    <button class="btn btn-sm btn-error btn-outline" @click="clearGenerated">Clear generated theme</button>
                    <button class="btn btn-sm btn-error btn-outline" @click="resetVariables">Reset variables</button>
                </div>

                <variable-settings
                    v-if="assetVariables && variableValues"
                    :variables="assetVariables"
                    v-model="variableValues"
                />

                <theme-result
                    v-if="generatedStyleSheets"
                    :stylesheets="generatedStyleSheets"
                />
            </div>
        </div>

        <!-- right panel -->
        <div class="grow overflow-auto">
            <page
                v-model="url"
                :stylesheets="previewStyleSheets"
                :base-url="getHostUrl()"
            />
        </div>
    </div>
</template>

<style scoped>
    .sidebar > *:not(:last-child) {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 3px double;
    }
</style>