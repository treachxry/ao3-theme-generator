<script setup lang="ts">
    import { Settings } from "lucide-vue-next";
</script>

<template>
    <header class="px-8 flex items-center bg-base-200 shadow shadow-base-300">
        <router-link to="/" class="flex items-center gap-4 text-lg font-medium">
            <img src="/icon.svg" alt="icon" class="size-8"/>
            <h1>AO3 Theme Generator</h1>
        </router-link>

        <nav class="flex gap-2 ms-auto items-center text-sm font-medium">
            <router-link to="/" active-class="text-error" class="px-2 py-4 transition-colors hover:text-error">Home</router-link>
            <router-link to="/site-skin" active-class="text-error" class="px-2 py-4 transition-colors hover:text-error">Site skin</router-link>
            <router-link to="/work-skin" active-class="text-error" class="px-2 py-4 transition-colors hover:text-error">Work skin</router-link>
            <button class="btn btn-ghost btn-disabled px-2 py-4">
                <settings/>
            </button>
        </nav>
    </header>
</template>