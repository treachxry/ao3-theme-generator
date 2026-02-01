<script setup lang="ts">
    import { computed, useTemplateRef } from "vue";

    const {origin, pathname} = defineProps<{
        origin: string
        pathname: string
    }>();

    const emits = defineEmits<{
        (e: 'change', pathname: string): void
    }>();

    const inputElement = useTemplateRef('url-input');

    const displayUrl = computed(() => {
        return new URL(pathname, origin).href;
    })

    function onKeyDown(e: KeyboardEvent): void {
        if(e.key === 'Enter') {
            inputElement.value?.blur();
        }
    }

    function updateUrl() {
        const value = inputElement.value?.value;

        if(!value) {
            return;
        }

        const newUrl = new URL(value);

        if(newUrl.pathname === pathname) {
            if (newUrl.origin !== origin && inputElement.value) {
                inputElement.value.value = displayUrl.value;
            }

            return;
        }

        emits('change', newUrl.pathname);
    }
</script>

<template>
    <input
        ref="url-input"
        type="text"
        :value="displayUrl"
        @focusout="updateUrl"
        @keydown="onKeyDown"
    />
</template>