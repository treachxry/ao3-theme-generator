<script setup lang="ts">
    import { StyleSheetAsset, StyleSheetImportance } from "shared/models";
    import { downloadFile } from "@/functions/downloads";
    import { Download, Copy } from "lucide-vue-next";

    const {stylesheet} = defineProps<{
        stylesheet: StyleSheetAsset
    }>();

    function getImportanceClass(importance: StyleSheetImportance) {
        switch(importance) {
            case StyleSheetImportance.Required:
                return 'badge-error';
            case StyleSheetImportance.Recommended:
                return 'badge-warning';
            case StyleSheetImportance.Optional:
                return 'opacity-60';
        }
    }

    async function copyContents() {
        await navigator.clipboard.writeText(stylesheet.content);
    }

    function downloadContents() {
        downloadFile(stylesheet.content, stylesheet.filename);
    }
</script>

<template>
    <div class="grid gap-1">
        <div class="font-semibold">
            <div class="flex items-center gap-1">
                <div class="text-sm me-auto">{{ stylesheet.description }}</div>
                <div class="badge badge-xs badge-outline" :class="getImportanceClass(stylesheet.importance)">{{ stylesheet.importance }}</div>
                <div class="badge badge-info badge-xs badge-outline">{{ (stylesheet.content.length / 1024).toFixed(1) }} KB</div>
            </div>
            <div class="text-[10px] opacity-80">@media {{ stylesheet.media }}</div>
        </div>
        <div class="grid grid-cols-2 gap-1">
            <button class="btn btn-xs btn-primary rounded h-5" @click="downloadContents">
                <download :size="14"/>
            </button>
            <button class="btn btn-xs btn-primary btn-outline rounded h-5" @click="copyContents">
                <copy :size="14"/>
            </button>
        </div>
    </div>
</template>