import { computed, Ref } from "vue";
import { useSingleton } from "@/composables/useSingleton";
import { useSkinSchema } from "@/composables/useSkinSchema";
import { getDefaultSchema } from "@/functions/theme";
import { SkinSchema } from "common/models";

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

function useSchemaStore(): ISchemaStore {
    const schema = computed<SkinSchema>(getDefaultSchema);
    const {getDefaultVariables, getUnit} = useSkinSchema(schema);

    return {
        schema,
        getDefaultVariables,
        getUnit
    };
}