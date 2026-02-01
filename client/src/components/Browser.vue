<script setup lang="ts">
    import { useReactiveStorage } from "@/composables/UseReactiveStorage";
    import BrowserToolbar from "@/components/BrowserToolbar.vue";
    import BrowserBody from "@/components/BrowserBody.vue";
    import LoadingIndicator from "@/components/LoadingIndicator.vue";
    import ErrorBoundary from "@/components/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ErrorPanel.vue";

    const {stylesheets, baseUrl} = defineProps<{
        stylesheets: CSSStyleSheet[]
        baseUrl: string
    }>();

    const url = useReactiveStorage<string>('tg-page-url', () => '/');

    function onNavigate(value: string) {
        url.value = value;
    }
</script>

<template>
    <div class="relative h-full flex flex-col">
        <browser-toolbar
            :base-url="baseUrl"
            v-model="url"
        />

        <div class="grow overflow-auto rounded-xl border-2 m-2 shadow shadow-base-300">
            <transition mode="out-in" name="fade">
                <div :key="url">
                    <error-boundary>
                        <suspense timeout="0">
                            <browser-body
                                :url="url"
                                :stylesheets="stylesheets"
                                :on-navigate="onNavigate"
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