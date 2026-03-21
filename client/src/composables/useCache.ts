export interface ICache<TKey, TValue> {
    get: (key: TKey, getter: () => TValue) => TValue
    getAsync: (key: TKey, getter: () => Promise<TValue>) => Promise<TValue>
    clear: () => void
    entries: () => MapIterator<[TKey, TValue]>
}

export interface ICacheOptions<TKey, TValue> {
    maxItems: number
}

export function useCache<TKey, TValue>(options?: ICacheOptions<TKey, TValue>): ICache<TKey, TValue> {
    const items: Map<TKey, TValue> = new Map<TKey, TValue>();
    const maxItems: number = options?.maxItems ?? 64;

    function get(key: TKey, getter: () => TValue): TValue {
        const item = items.get(key);

        if(item !== undefined) {
            return item;
        }

        return insertNew(key, getter());
    }

    async function getAsync(key: TKey, getter: () => Promise<TValue>): Promise<TValue> {
        const item = items.get(key);

        if(item !== undefined) {
            return item;
        }

        return insertNew(key, await getter());
    }

    function insertNew(key: TKey, value: TValue): TValue {
        if(maxItems > 0 && items.size > maxItems) {
            const firstKey = items.keys().next().value;

            if(firstKey !== undefined) {
                items.delete(firstKey);
            }
        }

        items.set(key, value);

        return value;
    }

    function clear(): void {
        items.clear();
    }

    function entries(): MapIterator<[TKey, TValue]> {
        return items.entries();
    }

    return {
        get,
        getAsync,
        clear,
        entries
    };
}