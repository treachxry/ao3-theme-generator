import { computed, Ref } from "vue";
import { useSingleton } from "@/composables/useSingleton";
import { useSkinSchema } from "@/composables/useSkinSchema";
import { getDefaultSchema } from "@/functions/theme";
import { SkinChunk, SkinSchema } from "common/models";
import { useStorageRef } from "@/composables/useStorageRef";
import { useVariableStylesheet } from "@/composables/useVariableStylesheet";
import { createMediaQueryWrapped } from "common/functions";

const {initializeComposable, useComposable} = useSingleton(useSchemaStore);

export {
    initializeComposable as initializeSchemaStore,
    useComposable as useSchemaStore
}

export interface ISchemaStore {
    schema: Readonly<Ref<SkinSchema>>
    getDefaultVariables: () => Record<string, string>
    getUnit: (key: string) => string
}

function useSchemaStore(chunks: SkinChunk[]) {
    const schema = computed<SkinSchema>(getDefaultSchema);
    const {getDefaultVariables, getUnit} = useSkinSchema(schema);
    const variables = useStorageRef('tg-editor-variables', getDefaultVariables);
    const variableStylesheet = useVariableStylesheet(variables, getUnit);

    const chunkStylesheets = chunks.map(c => createMediaQueryWrapped(c.media, c.content));

    const stylesheets = computed<CSSStyleSheet[]>(() => {
        return [
            variableStylesheet.value,
            ...chunkStylesheets
        ];
    });

    return {
        schema,
        stylesheets,
        variables,
        getDefaultVariables,
        getUnit
    };
}