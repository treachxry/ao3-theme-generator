<script setup lang="ts">
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
    import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";

    defineProps<{
        component: any
        routeKey: string
    }>();
</script>

<template>
    <transition mode="out-in" name="fade" appear>
        <div class="h-full" :key="routeKey">
            <error-boundary>
                <suspense timeout="0">
                    <component :is="component"/>
                    <template #fallback>
                        <loading-indicator/>
                    </template>
                </suspense>
                <template #error="{error, clearError}">
                    <error-panel :error="error" :clear-error="clearError"/>
                </template>
            </error-boundary>
        </div>
    </transition>
</template>