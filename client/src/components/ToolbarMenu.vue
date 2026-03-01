<script setup lang="ts">
    import { ref, FunctionalComponent } from "vue";

    const {icon} = defineProps<{
        icon: FunctionalComponent
    }>();

    const isMenuOpen = ref<boolean>(false);

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value;
    }

    function closeMenu(event: FocusEvent) {
        if(event.currentTarget instanceof Node && event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
            return;
        }

        isMenuOpen.value = false;
    }
</script>

<template>
    <div tabindex="0" class="relative z-10" @blur="closeMenu">
        <div class="btn btn-ghost p-1" @click="toggleMenu" >
            <component :is="icon" class="size-5"/>
        </div>

        <div v-show="isMenuOpen" class="absolute top-full right-0 border border-base-content/30 rounded bg-base-100">
            <slot/>
        </div>
    </div>
</template>