<script setup lang="ts">
    import { onErrorCaptured, ref } from "vue";

    const error = ref<Error | null>(null);

    defineSlots<{
        default(): any
        error(props: { error: Error, clearError: () => void }): any
    }>();

    onErrorCaptured(err => {
        error.value = err;
        return false;
    });

    function clearError() {
        error.value = null;
    }
</script>

<template>
    <slot name="error" v-if="error" :error :clearError/>
    <slot name="default" v-else/>
</template>