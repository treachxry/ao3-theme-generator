<script setup lang="ts">
    import { PaintBucket, SquareRoundCorner, Ruler, RotateCcw, Zap, Flame } from "lucide-vue-next";
    import { useSiteSkinEditor } from "@/composables/useSiteSkinEditor";
    import ThemeColorGroup from "@/components/ThemeColorGroup.vue";

    const {activeVariables, theme, resetActiveVariables, createTheme} = useSiteSkinEditor();
</script>

<template>
    <div class="grid gap-8">
        <div>
            <h3 class="sidebar-divider">
                <zap/>
                <span>Actions</span>
            </h3>
            <div class="grid gap-2">
                <button class="btn btn-sm btn-success justify-between" @click="createTheme">
                    <span>Create theme</span>
                    <flame/>
                </button>
                <button class="btn btn-sm btn-error btn-outline justify-between" @click="resetActiveVariables">
                    <span>Reset all variables</span>
                    <rotate-ccw/>
                </button>
            </div>
        </div>

        <div>
            <h3 class="sidebar-divider">
                <paint-bucket/>
                <span>Change colors</span>
            </h3>
            <div class="grid grid-cols-4 gap-4 text-neutral-content/80">
                <theme-color-group
                    v-for="group in theme.colors"
                    v-model="activeVariables"
                    :group="group"
                />
            </div>
        </div>

        <div>
            <h3 class="sidebar-divider">
                <square-round-corner/>
                <span>Radius</span>
            </h3>
            <div class="grid gap-4 text-neutral-content/80">
                <div v-for="radius in theme.radius" class="text-xs">
                    <div class="flex justify-between mb-1 px-0.5">
                        <span>{{ radius.description }}</span>
                        <span>{{ activeVariables[radius.key] }}{{ radius.unit }}</span>
                    </div>
                    <input
                        type="range"
                        class="range range-xs"
                        :min="radius.min"
                        :max="radius.max"
                        :step="radius.step"
                        v-model="activeVariables[radius.key]"
                    />
                </div>
            </div>
        </div>

        <div>
            <h3 class="sidebar-divider">
                <ruler/>
                <span>Sizes</span>
            </h3>
            <div class="grid gap-4 text-neutral-content/80">
                <div v-for="size in theme.sizes" class="text-xs">
                    <div class="flex justify-between mb-1 px-0.5">
                        <span>{{ size.description }}</span>
                        <span>{{ activeVariables[size.key] }}{{ size.unit }}</span>
                    </div>
                    <input
                        type="range"
                        class="range range-xs"
                        :min="size.min"
                        :max="size.max"
                        :step="size.step"
                        v-model="activeVariables[size.key]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>