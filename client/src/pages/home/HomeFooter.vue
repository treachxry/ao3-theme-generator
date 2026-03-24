<script setup lang="ts">
    import { format } from "date-fns";

    const appVersion = __APP_VERSION__;
    const buildDate = format(__BUILD_DATE__, "yyyy-MMdd-HHmm");
</script>

<template>
    <footer class="px-4 py-1 font-mono outline-2 outline-base-300">
        <div class="flex items-center gap-8 text-xs">
            <span class="text-error">
                v-{{appVersion}}
            </span>
            <span class="text-error me-auto">
                build-{{ buildDate }}
            </span>
            <span class="text-primary">
                <a href="https://github.com/treachxry/ao3-theme-generator" class="link link-primary">Source code</a>
            </span>
            <span class="text-primary">
                Made by <a href="https://github.com/treachxry" class="link link-primary">treachxry</a>
            </span>
        </div>
    </footer>
</template>