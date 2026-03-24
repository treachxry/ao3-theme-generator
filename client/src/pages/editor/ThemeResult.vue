<script setup lang="ts">
    import { computed, ref } from "vue";
    import JSZip from "jszip";
    import { FolderDown, Check, Trash2, FileText } from "@lucide/vue";
    import { downloadFile, getFileSizeWithUnit } from "@/functions/file-utils";
    import { GeneratedSkin } from "@/models/GeneratedSkin";
    import ThemeResultDetails from "@/pages/editor/ThemeResultDetails.vue";

    const {theme} = defineProps<{
        theme: GeneratedSkin
    }>();

    const emits = defineEmits<{
        (e: 'clear'): void
    }>();

    const detailsOpen = ref<boolean>(false);

    const totalSize = computed<string>(() => {
        const totalBytes = theme.chunks.reduce((sum, sheet) => sum + sheet.content.length, 0);
        const {size, unit} = getFileSizeWithUnit(totalBytes);

        return `${size.toPrecision(4)} ${unit}`;
    })

    async function downloadTheme(): Promise<void> {
        const zip = new JSZip();

        for(const stylesheet of theme.chunks) {
            zip.file(stylesheet.filename, stylesheet.content);
        }

        const blob = await zip.generateAsync({type: 'blob'});

        downloadFile(blob, `${theme.name}.zip`);
    }

    function deleteTheme(): void {
        emits('clear');
    }

    function openDetails(): void {
        detailsOpen.value = true;
    }

    function closeDetails(): void {
        detailsOpen.value = false;
    }
</script>

<template>
    <div class="min-w-0 flex cursor-pointer items-center gap-2 p-1 hover:bg-base-200 rounded-lg transition-colors" @click="openDetails">
        <file-text class="text-base-content/60 shrink-0"/>

        <div class="shrink min-w-0 truncate font-medium text-xs" :title="theme.name">
            {{ theme.name }}
        </div>

        <div class="ms-auto badge badge-xs badge-success gap-0 shrink-0">
            <check class="size-3.5"/>
            <span class="text-nowrap">{{ totalSize }}</span>
        </div>

        <div class="flex items-center shrink-0">
            <button class="btn btn-ghost btn-primary px-1 py-0.5 h-auto rounded-sm" @click.stop="downloadTheme">
                <folder-down/>
            </button>
            <button class="btn btn-ghost btn-error px-1 py-0.5 h-auto rounded-sm" @click.stop="deleteTheme">
                <trash2/>
            </button>
        </div>
    </div>

    <teleport v-if="detailsOpen" to="body">
        <theme-result-details
            :theme="theme"
            :close="closeDetails"
        />
    </teleport>
</template>