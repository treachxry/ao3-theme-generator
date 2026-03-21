import { ref, computed, ComputedRef, nextTick } from 'vue';

export interface IHistory {
    location: ComputedRef<string>
    canBack: ComputedRef<boolean>
    canForward: ComputedRef<boolean>
    push: (to: string) => void
    back: () => void
    forward: () => void
    reload: () => Promise<void>
}

export function useHistory(initial: string = '/'): IHistory {
    const stack = ref<string[]>([initial]);
    const index = ref<number>(0);

    const location = computed<string>(() => stack.value[index.value]);
    const canBack = computed<boolean>(() => index.value > 0);
    const canForward = computed<boolean>(() => index.value < stack.value.length - 1);

    function push(to: string): void {
        if(location.value === to) {
            return;
        }

        stack.value.splice(index.value + 1);
        stack.value.push(to);
        index.value = stack.value.length - 1;
    }

    function back(): void {
        if(canBack.value){
            index.value--;
        }
    }

    function forward(): void {
        if(canForward.value){
            index.value++;
        }
    }

    async function reload(): Promise<void> {
        const currentLocation = location.value;
        stack.value.splice(index.value, 1, '----------/');

        await nextTick();

        stack.value.splice(index.value, 1, currentLocation);
    }

    return {
        location,
        canBack,
        canForward,
        push,
        back,
        forward,
        reload
    };
}