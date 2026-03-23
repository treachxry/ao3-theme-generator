export interface ICache<TKey, TValue> {
    get: (key: TKey, getter: () => TValue) => TValue
    getAsync: (key: TKey, getter: () => Promise<TValue>) => Promise<TValue>
    clear: () => void
    entries: () => MapIterator<[TKey, TValue]>
}

export interface ICacheOptions<TKey, TValue> {
    maxItems?: number
}

export function useCache<TKey, TValue>(storage: Map<TKey, TValue>, options: ICacheOptions<TKey, TValue> = {}): ICache<TKey, TValue> {
    function get(key: TKey, getter: () => TValue): TValue {
        const item = storage.get(key);

        if(item !== undefined) {
            return item;
        }

        return insertNew(key, getter());
    }

    async function getAsync(key: TKey, getter: () => Promise<TValue>): Promise<TValue> {
        const item = storage.get(key);

        if(item !== undefined) {
            return item;
        }

        return insertNew(key, await getter());
    }

    function insertNew(key: TKey, value: TValue): TValue {
        const maxItems: number = options.maxItems ?? 64;

        if(maxItems > 0 && storage.size > maxItems) {
            const firstKey = storage.keys().next().value;

            if(firstKey !== undefined) {
                storage.delete(firstKey);
            }
        }

        storage.set(key, value);

        return value;
    }

    function clear(): void {
        storage.clear();
    }

    function entries(): MapIterator<[TKey, TValue]> {
        return storage.entries();
    }

    return {
        get,
        getAsync,
        clear,
        entries
    };
}