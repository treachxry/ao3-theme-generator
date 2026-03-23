<script setup lang="ts">
    import { computed, useTemplateRef } from "vue";
    import { House, ArrowLeft, ArrowRight, RotateCw, Menu, FileCode } from "lucide-vue-next";
    import { getHostUrl } from "common/functions";
    import { IHistory } from "@/composables/useHistory";
    import { useSkinStore } from "@/stores/useSkinStore";
    import ToolbarMenu from "@/pages/editor/ToolbarMenu.vue";
    import ThemeResult from "@/pages/editor/ThemeResult.vue";

    const {skins, removeSkin} = useSkinStore();

    const {history} = defineProps<{
        history: IHistory
    }>();

    const inputElement = useTemplateRef('url-input');

    const displayUrl = computed<string>(() => {
        return getHostUrl() + history.location.value;
    });

    function onKeyDown(e: KeyboardEvent): void {
        if(e.key === 'Enter') {
            inputElement.value?.blur();
        }
    }

    function onFocusOut() {
        if(!inputElement.value) {
            return;
        }

        try {
            const url = new URL(inputElement.value.value);
            const path = url.pathname + url.search + url.hash;

            history.push(path);
        }
        catch {
            inputElement.value.value = displayUrl.value;
        }
    }
</script>

<template>
    <div class="flex gap-4 items-center justify-between px-2 relative">
        <div class="flex items-center gap-2">
            <button
                class="btn btn-ghost p-1"
                :class="{'btn-disabled': !history.canBack.value}"
                title="Go back one page"
                @click="history.back()"
            >
                <arrow-left class="size-5"/>
            </button>

            <button
                class="btn btn-ghost p-1"
                :class="{'btn-disabled': !history.canForward.value}"
                title="Go forward one page"
                @click="history.forward()"
            >
                <arrow-right class="size-5"/>
            </button>

            <button
                class="btn btn-ghost p-1"
                title="Reload current page"
                @click="history.reload()"
            >
                <rotate-cw class="size-5"/>
            </button>
        </div>

        <div class="flex items-center gap-2">
            <button class="btn btn-ghost p-1" @click="history.push('/')" title="Go to home page">
                <house class="size-5"/>
            </button>

            <input
                type="text"
                class="input input-sm bg-base-200 outline-0 w-80"
                ref="url-input"
                :value="displayUrl"
                @focusout="onFocusOut"
                @keydown="onKeyDown"
            />
        </div>

        <div class="flex items-center gap-2">
            <toolbar-menu :icon="FileCode">
                <div class="grid text-sm overflow-y-auto w-80 max-h-120 p-1">
                    <template v-if="skins.length">
                        <theme-result
                            v-for="(skin, i) in skins"
                            :theme="skin"
                            @clear="removeSkin(i)"
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