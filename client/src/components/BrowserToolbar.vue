<script setup lang="ts">
    import { nextTick } from "vue";
    import { House, ArrowLeft, ArrowRight, RotateCw, Menu, FileCode } from "lucide-vue-next";
    import BrowserUrl from "@/components/BrowserUrl.vue";
    import ToolbarMenu from "@/components/ToolbarMenu.vue";
    import ThemeResult from "@/components/ThemeResult.vue";
    import { useSiteSkinEditor } from "@/composables/useSiteSkinEditor";

    const {baseUrl} = defineProps<{
        baseUrl: string
    }>();

    const {generatedThemes} = useSiteSkinEditor();

    const url = defineModel<string>({
        required: true
    });

    function onNavigate(value: string) {
        url.value = value;
    }

    async function onReload() {
        const value = url.value;

        url.value = '';
        await nextTick();
        url.value = value;
    }

    function removeTheme(index: number) {
        generatedThemes.value.splice(index, 1);
    }
</script>

<template>
    <div class="flex gap-4 items-center justify-between px-2 relative">
        <div class="flex items-center gap-2">
            <button class="btn btn-ghost p-1" :class="{'btn-disabled': true}" title="Go back one page">
                <arrow-left class="size-5"/>
            </button>
            <button class="btn btn-ghost p-1" :class="{'btn-disabled': true}" title="Go forward one page">
                <arrow-right class="size-5"/>
            </button>
            <button class="btn btn-ghost p-1" @click="onReload" title="Reload current page">
                <rotate-cw class="size-5"/>
            </button>
        </div>

        <div class="flex items-center gap-2">
            <button class="btn btn-ghost p-1" @click="onNavigate('/')" title="Go to home page">
                <house class="size-5"/>
            </button>

            <browser-url
                :origin="baseUrl"
                :pathname="url"
                @change="onNavigate"
                class="input input-sm bg-base-200 outline-0 w-80"
            />
        </div>

        <div class="flex items-center gap-2">
            <toolbar-menu :icon="FileCode">
                <div class="grid text-sm overflow-y-auto w-80 max-h-120 p-1">
                    <template v-if="generatedThemes.length">
                        <theme-result
                            v-for="(theme, i) in generatedThemes"
                            :theme="theme"
                            @clear="removeTheme(i)"
                        />
                    </template>
                    <div v-else class="text-nowrap px-2 py-1">
                        Generated themes will show up here.
                    </div>
                </div>
            </toolbar-menu>
            <toolbar-menu :icon="Menu">
                <div class="grid text-sm w-80">
                    <div class="px-3 py-1.5">To be implemented</div>
                </div>
            </toolbar-menu>
        </div>
    </div>
</template>