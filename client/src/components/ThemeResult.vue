<script setup lang="ts">
    import { onBeforeUnmount, ref } from "vue";
    import JSZip from "jszip";
    import { FolderArchive, ChevronRight, ChevronDown, SquareCode, Trash2 } from "lucide-vue-next";
    import { useAbort } from "@/composables/UseAbort";
    import { downloadFile } from "@/functions/downloads";
    import { fetchTheme } from "@/functions/api";
    import { StyleSheetAsset, ThemeInfo } from "shared/models";
    import ThemePart from "@/components/ThemePart.vue";

    const {variables} = defineProps<{
        variables: Record<string, string>
    }>();

    const emits = defineEmits<{
        (e: 'clear'): void
    }>();

    onBeforeUnmount(() => {
        abort();
    });

    const {runAbortable, abort} = useAbort();
    const stylesheets = ref<StyleSheetAsset[] | undefined>(await onThemeCreate());
    const detailsOpen = ref<boolean>(false);

    async function onThemeCreate(): Promise<StyleSheetAsset[] | undefined> {
        return runAbortable(async signal => {
            const values = Object.entries(variables).map(v => v);

            const response = await fetchTheme(values, signal);

            if(!response.ok) {
                throw new Error(`Request failed: ${response.statusText}`);
            }

            const data: ThemeInfo = await response.json();

            return data.stylesheets;
        });
    }

    async function downloadTheme(): Promise<void> {
        if(!stylesheets.value) {
            return;
        }

        const zip = new JSZip();

        for(const stylesheet of stylesheets.value) {
            zip.file(stylesheet.filename, stylesheet.content);
        }

        const blob = await zip.generateAsync({type: 'blob'});

        downloadFile(blob, 'site-skin.zip');
    }

    function onClear(): void {
        emits('clear');
    }
</script>

<template>
    <div>
        <h3 class="sidebar-divider">
            <square-code/>
            <span>Results</span>
        </h3>
        <div class="grid gap-2">
            <button class="btn btn-sm btn-primary justify-between" @click="downloadTheme">
                <span>Download as archive</span>
                <folder-archive/>
            </button>
            <div class="grid bg-base-200 rounded-lg shadow shadow-base-300">
                <button @click="detailsOpen= !detailsOpen" class="btn btn-sm btn-primary btn-outline justify-between">
                    <span>Individual parts</span>
                    <chevron-down v-if="detailsOpen"/>
                    <chevron-right v-else/>
                </button>
                <div v-if="detailsOpen" class="grid px-1.5 py-3">
                    <theme-part
                        v-for="(stylesheet, i) in stylesheets"
                        :stylesheet="stylesheet"
                        :class="{'mt-2.5 pt-1.5 border-t border-base-content/50': i !== 0}"
                    />
                </div>
            </div>
            <button class="btn btn-sm btn-error btn-outline justify-between" @click="onClear">
                <span>Discard theme</span>
                <trash2/>
            </button>
        </div>
    </div>
</template>