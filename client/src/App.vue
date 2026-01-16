<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import RenderedAo3Page from "@/components/RenderedAo3Page.vue";
    import { fetchAPI } from "@/functions/api.ts";
    import { AssetsResponse, PageResponse } from "ao3-tg-shared";
    import AppFooter from "@/components/AppFooter.vue";

    const assets = ref<AssetsResponse>();
    const pages = ref<PageResponse>();

    const variableValues = ref<string[]>();

    const stylesheets = computed<string[]>(() => {
        if(!assets.value) {
            return [];
        }

        const variableStrings = [
            `--color-base-content: ${variableValues.value}`,
            ...assets.value.variables.map((v, i) => `${v.key}: ${variableValues.value ? (variableValues.value[i] ?? v.default) : v.default}${v.unit ?? ''}`)
        ];

        return [
            `*{${variableStrings.join(';')}}`,
            ...assets.value.stylesheets.map(s => `@media ${s.media} {${s.contents}}`)
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
        variableValues.value = assets.value?.variables.map(v => v.default) ?? [];
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
                        :placeholder="v.default"
                        v-model="variableValues[i]"
                        class="input input-sm"
                    />
                    <span v-if="v.unit" class="w-10 ps-1">{{ v.unit }}</span>
                </span>
            </fieldset>
        </div>

        <rendered-ao3-page
            v-if="pages"
            :url="pages.url"
            :html="pages.html"
            :stylesheets="stylesheets"
            class="mx-4"
        />

        <div class="mx-12 text-3xl text-error flex items-center justify-center gap-12">
            <div>Work in progress, most things aren't functional!</div>
            <img src="/hopital.jpeg" width="240" class="object-contain" alt="caffeine is my primary source of sustenance"/>
        </div>

        <app-footer/>
    </main>
</template>