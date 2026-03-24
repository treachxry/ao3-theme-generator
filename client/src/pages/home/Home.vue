<script setup lang="ts">
    import HomeFooter from "@/pages/home/HomeFooter.vue";
</script>

<template>
    <div class="absolute inset-0 flex flex-col">
        <div class="overflow-y-auto grow p-8 flex flex-col gap-6 text-lg">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl underline font-bold text-primary">What is this?</h1>
                <div>
                    Just an ambitious hobby project that aims to enable making custom AO3 site skins.
                    I've not found any other program that tries to achieve anything similar and weaponize CSS to this extent.
                </div>
                <div>
                    Still very much work in progress, and likely will remain such for the foreseeable future.
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <h1 class="text-2xl underline font-bold text-primary">How is AO3 embedded here?</h1>
                <div>
                    It's not. What you see in the editor is an elaborate fake, a simulation of what the site would look like.
                    Links are fully functional, however other site logic (like login or commenting) will not work.
                </div>
            </div>

            <div class="mt-8 flex items-center justify-center gap-4">
                <router-link to="/editor" class="btn btn-lg btn-primary">Go to skin editor</router-link>
            </div>
        </div>

        <home-footer/>
    </div>
</template>