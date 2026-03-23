<script setup lang="ts">
    import { PaintBucket, SquareRoundCorner, Ruler, RotateCcw, Zap, Flame } from "lucide-vue-next";
    import { fetchTheme } from "@/functions/api";
    import { SkinChunk } from "common/models";
    import { useSkinStore } from "@/stores/useSkinStore";
    import { useSchemaStore } from "@/stores/useSchemaStore";
    import ThemeColorGroup from "@/pages/editor/ThemeColorGroup.vue";

    const variables = defineModel<Record<string, string>>({
        required: true
    });

    const {schema, getDefaultVariables} = useSchemaStore();
    const {createSkin} = useSkinStore();

    function resetVariables(): void {
        variables.value = getDefaultVariables();
    }

    async function newSkin() {
        try {
            const entries = Object.entries(variables.value);
            const response = await fetchTheme(entries);

            if(!response.ok) {
                console.error(response.statusText);
                return;
            }

            const chunks: SkinChunk[] = await response.json();

            createSkin(`unnamed-skin-${new Date()}`, chunks);
        }
        catch(err) {
            console.error(err);
        }
    }
</script>

<template>
    <div class="grid gap-8">
        <div>
            <h3 class="sidebar-divider">
                <zap/>
                <span>Actions</span>
            </h3>
            <div class="grid gap-2">
                <button class="btn btn-sm btn-success justify-between" @click="newSkin">
                    <span>Create skin</span>
                    <flame/>
                </button>
                <button class="btn btn-sm btn-error btn-outline justify-between" @click="resetVariables">
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
                    v-for="group in schema.colors"
                    v-model="variables"
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
                <div v-for="radius in schema.radius" class="text-xs">
                    <div class="flex justify-between mb-1 px-0.5">
                        <span>{{ radius.description }}</span>
                        <span>{{ variables[radius.key] }}{{ radius.unit }}</span>
                    </div>
                    <input
                        type="range"
                        class="range range-xs"
                        :min="radius.min"
                        :max="radius.max"
                        :step="radius.step"
                        v-model="variables[radius.key]"
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
                <div v-for="size in schema.sizes" class="text-xs">
                    <div class="flex justify-between mb-1 px-0.5">
                        <span>{{ size.description }}</span>
                        <span>{{ variables[size.key] }}{{ size.unit }}</span>
                    </div>
                    <input
                        type="range"
                        class="range range-xs"
                        :min="size.min"
                        :max="size.max"
                        :step="size.step"
                        v-model="variables[size.key]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>