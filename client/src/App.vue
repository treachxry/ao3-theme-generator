<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import RenderedAo3Page from "@/components/RenderedAo3Page.vue";
    import { fetchAPI } from "@/functions/api.ts";
    import { AssetsResponse, PageResponse, GenerateResponse, createMediaQueryWrapped, createRule, createProperty } from "ao3-tg-shared";
    import AppFooter from "@/components/AppFooter.vue";
    import ThemeDisplay from "@/components/ThemeDisplay.vue";
    import { useReactiveStorage } from "@/composables/UseReactiveStorage.ts";

    const assets = ref<AssetsResponse>();
    const pages = ref<PageResponse>();
    const generated = ref<GenerateResponse>();

    const variableValues = useReactiveStorage<string[]>('tg-values');

    const stylesheets = computed<string[]>(() => {
        if(!assets.value) {
            return [];
        }

        const properties = [
            `--color-base-content: ${variableValues.value}`,
            ...assets.value.variables.map((v, i) => createProperty(v.key,`${variableValues.value ? (variableValues.value[i] ?? v.default) : v.default}${v.unit ?? ''}`))
        ];

        return [
            createRule('*', properties),
            createRule('[data-nav-link="true"]', [createProperty('cursor', 'pointer')]),
            ...assets.value.stylesheets.map(stylesheet => createMediaQueryWrapped(stylesheet.media, stylesheet.contents))
        ];
    });

    onMounted(async () => {
        await getPage();
        await getAssets();
    })

    async function getPage() {
        const response = await fetchAPI('/api/pages');

        if(!response.ok) {
            console.error('Request failed:', response.statusText);
            return;
        }

        pages.value = await response.json();
    }

    async function getAssets() {
        const response = await fetchAPI('/api/assets');

        if(!response.ok) {
            console.error('Request failed:', response.statusText);
            return;
        }

        assets.value = await response.json();

        if(!variableValues.value) {
            resetVariables();
        }
    }

    function resetVariables() {
        variableValues.value = assets.value?.variables.map(v => v.default) ?? [];
    }

    async function getGenerated() {
        if(!assets.value || !variableValues.value) {
            return;
        }

        const values = getVariableValues();

        if(!values) {
            return;
        }

        const body = JSON.stringify(values);

        const response = await fetchAPI('/api/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        });

        generated.value = await response.json();
    }

    function getVariableValues() {
        if(!assets.value || !variableValues.value) {
            return;
        }

        const results: [string, string][] = [];

        for(let i = 0; i < assets.value.variables.length; i++) {
            const key = assets.value.variables[i]!.key;
            const value = variableValues.value[i] ?? assets.value.variables[i]!.default;

            results.push([key, value])
        }

        return results;
    }

    function clearGenerated() {
        generated.value = undefined;
    }
</script>

<template>
    <main class="flex flex-col gap-8 min-h-full overflow-auto">
        <div v-if="assets && variableValues" class="mt-4 flex gap-x-6 gap-y-2 flex-wrap px-6 py-2 bg-base-300">
            <fieldset v-for="(v, i) in assets.variables" class="fieldset w-40">
                <legend class="fieldset-legend">{{ v.description }}</legend>
                <span class="flex items-center">
                    <input
                        :type="v.type"
                        v-model="variableValues[i]"
                        class="input input-sm"
                    />
                    <span v-if="v.unit" class="w-10 ps-1">{{ v.unit }}</span>
                </span>
            </fieldset>
        </div>

        <div class="mx-6">
            <button class="btn btn-success btn-outline" @click="getGenerated">Generate theme</button>
            <button class="btn btn-error btn-outline ms-4" @click="clearGenerated">Clear generated theme</button>
            <button class="btn btn-error btn-outline ms-4" @click="resetVariables">Reset all values</button>

            <theme-display
                v-if="generated"
                :stylesheets="generated.stylesheets"
                class="my-4"
            />
        </div>

        <rendered-ao3-page
            v-if="pages"
            :url="pages.url"
            :html="pages.html"
            :stylesheets="stylesheets"
            class="mx-4"
        />

        <app-footer/>
    </main>
</template>