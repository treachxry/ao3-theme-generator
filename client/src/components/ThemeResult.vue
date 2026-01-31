<script setup lang="ts">
    import { ref } from "vue";
    import JSZip from "jszip";
    import { FolderArchive, ChevronRight, ChevronDown, SquareCode, Trash2 } from "lucide-vue-next";
    import { StyleSheetAsset } from "shared/models";
    import { downloadFile } from "@/functions/downloads";
    import ThemePart from "@/components/ThemePart.vue";

    const {stylesheets} = defineProps<{
        stylesheets: StyleSheetAsset[]
    }>();

    const emits = defineEmits<{
        (e: 'clear'): void
    }>();

    const detailsOpen = ref<boolean>(false);

    async function downloadTheme() {
        const zip = new JSZip();

        for(const stylesheet of stylesheets) {
            zip.file(stylesheet.filename, stylesheet.content);
        }

        const blob = await zip.generateAsync({type: 'blob'});

        downloadFile(blob, 'site-skin.zip');
    }

    function onClear() {
        emits('clear');
    }
</script>

<template>
    <div>
        <h3 class="flex items-center gap-2 mb-4">
            <square-code :size="16"/>
            <span class="text-sm">Results</span>
            <span class="border-b grow ms-2"/>
        </h3>
        <div class="grid gap-2">
            <button class="btn btn-sm btn-primary justify-between" @click="downloadTheme">
                <span>Download as archive</span>
                <folder-archive :size="16"/>
            </button>
            <div class="grid bg-base-200 rounded-lg shadow shadow-base-300">
                <button @click="detailsOpen= !detailsOpen" class="btn btn-sm btn-primary btn-outline justify-between">
                    <span>Individual parts</span>
                    <chevron-down v-if="detailsOpen" :size="16"/>
                    <chevron-right v-else :size="16"/>
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
                <trash2 :size="16"/>
            </button>
        </div>
    </div>
</template>