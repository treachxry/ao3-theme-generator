import { ref, Ref, watch } from "vue";

export function useReactiveStorage<T>(key: string): Ref<T | null> {
    const handler = useStorage<T>(localStorage, key);
    const result = ref<T | null>(handler.load()) as Ref<T | null>;

    watch(result, (value) => {
        if(value !== null) {
            handler.save(value);
        }
    }, {deep: true});

    return result;
}

function useStorage<T>(storage: Storage, key: string): StorageHandler<T> {
    function load(): T | null {
        try {
            const serializedValue: string | null = storage.getItem(key);

            if(serializedValue !== null) {
                return JSON.parse(serializedValue);
            }
        }
        catch(error) {
            console.warn(`Failed to parse "${key}" from storage.`, error);

            discard();
        }

        return null;
    }

    function save(value: T): void {
        if(value === undefined) {
            discard();
            return;
        }

        try {
            const serializedValue: string = JSON.stringify(value);

            storage.setItem(key, serializedValue);
        }
        catch(error) {
            console.warn(`Failed to save "${key}" to storage.`, error);
        }
    }

    function discard(): void {
        storage.removeItem(key);
    }

    return {
        load,
        save,
        discard
    };
}

type StorageHandler<T> = {
    load: () => T | null
    save: (value: T) => void
    discard: () => void
};