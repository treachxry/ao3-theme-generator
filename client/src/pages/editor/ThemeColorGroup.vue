<script setup lang="ts">
    import { ColorGroup, ColorVariable } from "common/models";

    const {group} = defineProps<{
        group: ColorGroup
    }>();

    const variableValues = defineModel<{ [key: string]: string }>({
        required: true
    });

    function groupStyle(group: ColorGroup) {
        return {
            gridColumn: `span ${group.items.length} / span ${group.items.length}`
        };
    }

    function groupInnerStyle(group: ColorGroup) {
        return {
            gridTemplateColumns: `repeat(${group.items.length}, minmax(0, 1fr))`
        };
    }

    function getColorCellStyle(group: ColorGroup, color: ColorVariable) {
        const bgKey = color.foreground ? group.items.find(c => !c.foreground)?.key : color.key;
        const fgKey = group.items.find(c => c.foreground)?.key;

        return {
            backgroundColor: bgKey ? variableValues.value[bgKey] : undefined,
            color: fgKey ? variableValues.value[fgKey] : undefined,
            fontSize: color.foreground ? '18px' : '12px'
        }
    }

    function colorText(color: ColorVariable): string {
        if(color.foreground) {
            return 'A';
        }

        return color.label ?? '';
    }
</script>

<template>
    <div class="grid" :style="groupStyle(group)">
        <div class="grid gap-4" :style="groupInnerStyle(group)">
            <label
                v-for="color in group.items"
                class="h-10 grow rounded-lg border border-neutral-content/30 font-bold flex justify-center items-center relative overflow-hidden"
                :style="getColorCellStyle(group, color)"
            >
                <span>{{ colorText(color) }}</span>
                <input
                    type="color"
                    class="invisible absolute left-full top-0"
                    v-model="variableValues[color.key]"
                />
            </label>
        </div>
        <span class="text-xs ms-0.5 text-neutral-content/80">{{ group.name }}</span>
    </div>
</template>