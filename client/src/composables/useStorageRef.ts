import { ref, Ref, watch } from "vue";
import { useStorage } from "@/composables/useStorage";

export function useStorageRef<T>(key: string): Ref<T | null>;
export function useStorageRef<T>(key: string, getDefault: () => T): Ref<T>;

export function useStorageRef<T>(key: string, getDefault?: () => T): Ref<T | null> {
    const handler = useStorage<T>(localStorage, key);
    const result = ref<T | null>(handler.load() ?? (getDefault ? getDefault() : null)) as Ref<T | null>;

    watch(result, (value) => {
        if(value !== null) {
            handler.save(value);
        }
    }, {deep: true});

    return result;
}