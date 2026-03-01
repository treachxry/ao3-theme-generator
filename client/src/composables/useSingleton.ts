import { inject, provide } from "vue";

export function useSingleton<TUse, TState>(useFn: (state: TState) => TUse) {
    const key = Symbol();

    function initializeComposable(state: TState): TUse {
        const composable = useFn(state);

        provide(key, composable);

        return composable;
    }

    function useComposable(): TUse {
        const composable = inject<TUse>(key);

        if(!composable) {
            throw new Error('Missing provided composable');
        }

        return composable;
    }

    return {
        initializeComposable,
        useComposable
    }
}