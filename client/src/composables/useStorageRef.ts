import { ref, Ref, watch } from "vue";
import { useStorage } from "@/composables/useStorage";

export function useStorageRef<T>(key: string): Ref<T | null>;
export function useStorageRef<T>(key: string, initializer: () => T): Ref<T>;

export function useStorageRef<T>(key: string, initializer?: () => T): Ref<T | null> {
    const storage = useStorage<T>(localStorage, key);
    const result = ref<T | null>(getInitialValue()) as Ref<T | null>;

    watch(result, value => {
        if(value !== null) {
            storage.setItem(value);
        }
    }, {deep: true});

    function getInitialValue(): T | null {
        const storedValue: T | null = storage.getItem();

        if(!initializer) {
            return storedValue;
        }

        const value: T = initializer();

        return mergeObjects(storedValue, value);
    }

    function isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
    }

    function mergeObjects<T>(oldValue: T, newValue: T): T {
        if(!isObject(oldValue) || !isObject(newValue)) {
            return newValue;
        }

        const result: Record<string, unknown> = {};

        for(const key of Object.keys(newValue)) {
            const oldProperty = oldValue[key];
            const newProperty = newValue[key];

            if(!(key in oldValue) || typeof oldProperty !== typeof newProperty) {
                result[key] = newProperty;
                continue;
            }

            if(isObject(newProperty) && isObject(oldProperty)) {
                result[key] = mergeObjects(oldProperty, newProperty);
                continue;
            }

            result[key] = oldProperty;
        }

        return result as T;
    }

    return result;
}