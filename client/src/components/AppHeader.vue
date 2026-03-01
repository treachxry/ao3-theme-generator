<script setup lang="ts">

</script>

<template>
    <header class="px-4 flex items-center outline-2 outline-base-300 font-medium">
        <router-link to="/" class="flex items-center gap-4 text-lg p-2 text-error">
            <img src="/icon.svg" alt="icon" class="size-8"/>
            <h1>AO3 Theme Generator</h1>
        </router-link>

        <nav class="flex items-center ms-auto my-2">
            <router-link to="/" active-class="text-error" class="btn btn-lg text-sm btn-ghost">Home</router-link>
            <router-link to="/site-skin" active-class="text-error" class="btn btn-lg text-sm btn-ghost">Site skin builder</router-link>
            <router-link to="/work-skin" active-class="text-error" class="btn btn-lg text-sm btn-ghost">Work skins</router-link>
        </nav>
    </header>
</template>