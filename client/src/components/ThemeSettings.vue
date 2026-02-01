<script setup lang="ts">
    import { Theme } from "shared/models";
    import { PaintBucket, SquareRoundCorner, Ruler } from "lucide-vue-next";
    import ThemeColorGroup from "@/components/ThemeColorGroup.vue";

    const {theme} = defineProps<{
        theme: Theme
    }>();

    const variableValues = defineModel<{ [key: string]: string }>({
        required: true
    });
</script>

<template>
    <div class="grid gap-8">
        <div>
            <h3 class="sidebar-divider">
                <paint-bucket/>
                <span>Change colors</span>
            </h3>
            <div class="grid grid-cols-4 gap-4 text-neutral-content/80">
                <theme-color-group
                    v-for="group in theme.colors"
                    v-model="variableValues"
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
                    <div class="mb-1 px-0.5">
                        {{ radius.description }}
                    </div>
                    <select v-model="variableValues[radius.key]" class="select select-sm">
                        <option v-for="v in radius.possibleValues" :value="String(v)">
                            {{ v }}{{ radius.unit }}
                        </option>
                    </select>
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
                        <span>{{ variableValues[size.key] }}{{size.unit }}</span>
                    </div>
                    <input
                        type="range"
                        class="range range-xs"
                        :min="size.min"
                        :max="size.max"
                        :step="size.step"
                        v-model="variableValues[size.key]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>