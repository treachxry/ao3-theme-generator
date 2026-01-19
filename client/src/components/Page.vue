<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { House } from "lucide-vue-next";
    import { fetchPages } from "@/functions/api.ts";
    import { PageResponse } from "ao3-tg-shared";
    import PageContent from "@/components/PageContent.vue";
    import PageUrl from "@/components/PageUrl.vue";

    const {stylesheets, baseUrl} = defineProps<{
        stylesheets: string[]
        baseUrl: string
    }>();

    const url = defineModel<string>({
        required: true
    });

    const html = ref<string>();
    const errorMessage = ref<string>();
    const controller = new AbortController();
    const inProgress = ref(false);

    onMounted(async () => {
        await setPage(url.value);
    });

    watch(url, async value => {
        await setPage(value);
    });

    async function setPage(urlPathname: string) {
        if(inProgress.value) {
            controller.abort();
        }

        inProgress.value = true;

        try {
            const response = await fetchPages(urlPathname, controller);

            if(!response.ok) {
                html.value = undefined;
                errorMessage.value = `${response.status} ${response.statusText}`;
                return;
            }

            const data: PageResponse = await response.json();

            html.value = data.page.html;
        }
        catch(e: any) {
            if(e.name === 'AbortError') {

            }
            else {
                console.error(e);
            }
        }

        inProgress.value = false;
    }

    function navigateTo(newUrl: string) {
        url.value = newUrl;
    }
</script>

<template>
    <div class="mockup-browser rounded-none relative">
        <div class="mockup-browser-toolbar">
            <div class="flex gap-2 mx-auto items-center">
                <button class="btn btn-ghost p-0 h-auto" @click="navigateTo('/')">
                    <house :size="18"/>
                </button>
                <page-url :base="baseUrl" v-model="url" class="input outline-0 m-0 w-80"/>
            </div>
        </div>

        <page-content
            v-if="html"
            :html="html"
            :stylesheets="stylesheets"
            @navigate="navigateTo"
        />

        <div v-else class="flex flex-col gap-8 items-center p-8">
            <div class="text-error text-2xl">{{ errorMessage }}</div>
        </div>
    </div>
</template>