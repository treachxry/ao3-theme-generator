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
            <h3 class="flex items-center gap-2 mb-4">
                <paint-bucket :size="16"/>
                <span class="text-sm">Change colors</span>
                <span class="border-b grow ms-2"/>
            </h3>
            <div class="grid grid-cols-4 gap-4">
                <theme-color-group
                    v-for="group in theme.colors"
                    v-model="variableValues"
                    :group="group"
                />
            </div>
        </div>

        <div>
            <h3 class="flex items-center gap-2 mb-4">
                <square-round-corner :size="16"/>
                <span class="text-sm">Radius</span>
                <span class="border-b grow ms-2"/>
            </h3>
            <div class="grid gap-4">
                <div v-for="radius in theme.radius">
                    <div class="text-xs mb-1">{{ radius.name }}</div>
                    <select v-model="variableValues[radius.key]" class="select select-sm">
                        <option v-for="v in radius.possibleValues" :value="String(v)">
                            {{ v }}{{ radius.unit }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <h3 class="flex items-center gap-2 mb-4">
                <ruler :size="16"/>
                <span class="text-sm">Sizes</span>
                <span class="border-b grow ms-2"/>
            </h3>
            <div class="grid gap-4">
                <div v-for="size in theme.sizes">
                    <div class="text-xs">{{ size.name }}</div>
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