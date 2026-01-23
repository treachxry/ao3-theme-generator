<script setup lang="ts">
    import AppFooter from "@/components/AppFooter.vue";
    import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
    <main class="flex flex-col h-full">
        <app-header/>
        <div class="grow relative">
            <router-view/>
        </div>
        <app-footer/>
    </main>
</template>