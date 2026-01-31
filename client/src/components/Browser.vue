<script setup lang="ts">
    import { House } from "lucide-vue-next";
    import { useReactiveStorage } from "@/composables/UseReactiveStorage";
    import BrowserBody from "@/components/BrowserBody.vue";
    import LoadingIndicator from "@/components/LoadingIndicator.vue";
    import BrowserUrl from "@/components/BrowserUrl.vue";
    import ErrorBoundary from "@/components/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ErrorPanel.vue";

    const {stylesheets, baseUrl} = defineProps<{
        stylesheets: string[]
        baseUrl: string
    }>();

    const url = useReactiveStorage<string>('tg-page-url', () => '/');

    function onNavigate(value: string) {
        url.value = value;
    }
</script>

<template>
    <div class="mockup-browser rounded-none relative">
        <div class="mockup-browser-toolbar">
            <div class="flex gap-2 mx-auto items-center">
                <button class="btn btn-ghost p-0 h-auto" @click="onNavigate('/')">
                    <house :size="18"/>
                </button>

                <browser-url
                    :origin="baseUrl"
                    v-model="url"
                    class="input outline-0 m-0 w-80"
                />
            </div>
        </div>

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
</template>