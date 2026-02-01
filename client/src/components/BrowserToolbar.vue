<script setup lang="ts">
    import { nextTick, ref } from "vue";
    import { House, ArrowLeft, ArrowRight, RotateCw, MenuIcon } from "lucide-vue-next";
    import BrowserUrl from "@/components/BrowserUrl.vue";

    const {baseUrl} = defineProps<{
        baseUrl: string
    }>();

    const url = defineModel<string>({
        required: true
    });

    const isMenuOpen = ref<boolean>(false);

    function onNavigate(pathname: string) {
        url.value = pathname;
    }

    async function reloadPage() {
        const value = url.value;

        url.value = '';
        await nextTick();
        url.value = value;
    }

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value;
    }

    function closeMenu() {
        isMenuOpen.value = false;
    }
</script>

<template>
    <div class="flex gap-4 items-center justify-between mx-4 mt-2 relative">
        <div class="flex items-center gap-1">
            <button class="btn btn-ghost p-1" :class="{'btn-disabled': true}" title="Go back one page">
                <arrow-left class="size-4.5"/>
            </button>
            <button class="btn btn-ghost p-1" :class="{'btn-disabled': true}" title="Go forward one page">
                <arrow-right class="size-4.5"/>
            </button>
            <button class="btn btn-ghost p-1" @click="reloadPage" title="Reload current page">
                <rotate-cw class="size-4.5"/>
            </button>
        </div>

        <div class="flex items-center gap-1">
            <button class="btn btn-ghost p-1" @click="onNavigate('/')" title="Go to home page">
                <house class="size-4.5"/>
            </button>

            <browser-url
                :origin="baseUrl"
                :pathname="url"
                @change="onNavigate"
                class="input h-5 text-xs bg-base-200 outline-0 w-80"
            />
        </div>

        <div class="flex items-center gap-1">
            <div tabindex="0" class="relative z-100" @blur="closeMenu" title="Open settings menu">
                <div class="btn btn-ghost p-1" @click="toggleMenu">
                    <menu-icon class="size-4.5"/>
                </div>

                <div v-if="isMenuOpen" class="absolute top-full mt-0.5 right-0 border border-base-content/30 rounded w-80 bg-base-100">
                    <div class="grid text-sm">
                        <div class="px-3 py-1.5">To be implemented</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>