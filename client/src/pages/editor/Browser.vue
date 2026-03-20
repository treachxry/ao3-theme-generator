<script setup lang="ts">
    import { useStorageRef } from "@/composables/useStorageRef";
    import { getHostUrl } from "common/functions";
    import BrowserToolbar from "@/pages/editor/BrowserToolbar.vue";
    import BrowserBody from "@/pages/editor/BrowserBody.vue";
    import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";

    const {stylesheets} = defineProps<{
        stylesheets: CSSStyleSheet[]
    }>();

    const url = useStorageRef<string>('tg-page-url', () => '/');
</script>

<template>
    <div class="relative h-full flex flex-col p-2 gap-2">
        <browser-toolbar
            v-model="url"
            :base-url="getHostUrl()"
        />

        <div class="grow overflow-auto rounded-xl border-2 shadow shadow-base-300">
            <transition mode="out-in" name="fade">
                <div :key="url">
                    <error-boundary>
                        <suspense timeout="0">
                            <browser-body
                                v-model="url"
                                :stylesheets="stylesheets"
                            />
                            <template #fallback>
                                <div class="my-8">
                                    <loading-indicator/>
                                </div>
                            </template>
                        </suspense>
                        <template #error="{error, clearError}">
                            <error-panel :error="error" :clear-error="clearError"/>
                        </template>
                    </error-boundary>
                </div>
            </transition>
        </div>
    </div>
</template>