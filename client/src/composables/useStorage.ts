export interface IStorage<T> {
    getItem: () => T | null
    setItem: (value: T) => void
    removeItem: () => void
}

export function useStorage<T>(storage: Storage, key: string): IStorage<T> {
    function getItem(): T | null {
        try {
            const serializedValue: string | null = storage.getItem(key);

            if(serializedValue !== null) {
                return JSON.parse(serializedValue);
            }
        }
        catch(error) {
            console.warn(`Failed to parse "${key}" from storage.`, error);
            removeItem();
        }

        return null;
    }

    function setItem(value: T): void {
        if(value === undefined) {
            removeItem();
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

    function removeItem(): void {
        storage.removeItem(key);
    }

    return {
        getItem,
        setItem,
        removeItem
    };
}