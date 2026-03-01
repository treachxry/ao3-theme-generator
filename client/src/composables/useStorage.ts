export function useStorage<T>(storage: Storage, key: string) {
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