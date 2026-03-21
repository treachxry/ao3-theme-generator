import { inject, provide } from "vue";

export interface ISingleton<TUse, TState> {
    initializeComposable: (state: TState) => TUse
    useComposable: () => TUse
}

export function useSingleton<TUse, TState>(useFn: (state: TState) => TUse): ISingleton<TUse, TState> {
    const key = Symbol();

    function initializeComposable(state: TState): TUse {
        const composable = useFn(state);

        provide(key, composable);

        return composable;
    }

    function useComposable(): TUse {
        const composable = inject<TUse>(key);

        if(composable === undefined) {
            throw new Error('Missing provided composable');
        }

        return composable;
    }

    return {
        initializeComposable,
        useComposable
    }
}