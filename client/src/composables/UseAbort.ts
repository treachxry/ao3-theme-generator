import { readonly, ref } from "vue";

export function useAbort() {
    const controller = new AbortController();
    const running = ref(false);

    async function runAbortable<T>(callback: (c: AbortController) => Promise<T>): Promise<T | undefined> {
        if(running.value) {
            controller.abort();
        }

        try {
            running.value = true;
            const result = await callback(controller);
            running.value = false;

            return result;
        }
        catch(e: any) {
            if(e.name !== 'AbortError') {
                running.value = false;
                throw e;
            }
            else {
                running.value = false;
            }
        }
    }

    return {
        isRunning: readonly(running),
        runAbortable,
        controller
    };
}