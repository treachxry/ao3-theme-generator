<script setup lang="ts">
    import { ref } from "vue";
    import RenderedContent from "@/components/RenderedContent.vue";

    const content = ref();

    async function fetchAPI(path: string) {
        const base = import.meta.env.DEV ? __API_URL_DEV__ : __API_URL__;
        const url = new URL(path, base);

        return fetch(url);
    }

    async function assignContent(url: string) {
        let res;

        try {
            res = await fetchAPI(url);

            if(res.ok) {
                content.value = await res.json();
            }
        }
        catch(e) {
            if(res) {
                content.value = `${res.status} ${res.statusText}`;
            }
            else {
                content.value = (e as any)?.message ?? '?';
            }
        }
    }
</script>

<template>
    <main>
        <div>
            <button @click="assignContent('/api/assets')">Get assets</button>
            <button @click="assignContent('/api/generate')">Generate default theme</button>
        </div>
        <pre>{{ JSON.stringify(content, null, 4) }}</pre>
        <div v-if="content">
            <rendered-content
                :html="content.html"
                :css="content.css"
            />
        </div>
    </main>
</template>