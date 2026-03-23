<script setup lang="ts">
    import { X } from "lucide-vue-next";
    import { GeneratedSkin } from "@/models/GeneratedSkin";
    import ThemePart from "@/pages/editor/ThemePart.vue";

    const {theme, close} = defineProps<{
        theme: GeneratedSkin
        close: () => void
    }>();
</script>

<template>
    <div class="absolute z-50 inset-0 bg-base-300/90 flex items-center justify-center" @click="close">
        <div class="w-full m-8 p-4 border bg-base-100 rounded-lg" @click.stop>
            <div class="flex items-center gap-4">
                <div class="me-auto underline">{{ theme.name }}</div>
                <button class="btn btn-success">Load theme</button>
                <button class="btn btn-error btn-ghost btn-square" @click="close">
                    <x class="size-6"/>
                </button>
            </div>

            <div>
                <div class="underline">Stylesheets</div>
                <div class="grid px-1.5 py-3">
                    <theme-part
                        v-for="(stylesheet, i) in theme.chunks"
                        :stylesheet="stylesheet"
                        :class="{'mt-2.5 pt-1.5 border-t border-base-content/50': i !== 0}"
                    />
                </div>
            </div>
        </div>
    </div>
</template>