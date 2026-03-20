<script setup lang="ts">
    defineProps<{
        error: Error
        clearError: () => void
    }>();
</script>

<template>
    <div class="h-full flex flex-col items-center justify-center text-error p-2 text-center">
        <span class="underline text-lg font-semibold">An unexpected error has occurred</span>
        <span v-if="error.message" class="text-sm max-w-120">{{ error.message }}</span>
        <button @click="clearError" class="mt-4 btn btn-warning btn-outline">Reload page</button>
    </div>
</template>