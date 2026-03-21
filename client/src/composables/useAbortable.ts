import { onBeforeUnmount } from "vue";

export type IAbortableCallback<T> = (signal: AbortSignal, abort: () => void) => Promise<T>

export async function useAbortable<T>(callback: IAbortableCallback<T>): Promise<T> {
    const controller: AbortController = new AbortController();

    function abort(): void {
        controller.abort();
    }

    async function runCallback(): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            controller.signal.addEventListener('abort', _ => {
                reject(controller.signal.reason);
            });

            try {
                const result: T = await callback(controller.signal, abort);
                resolve(result);
            }
            catch(e) {
                reject(e);
            }
        });
    }

    onBeforeUnmount(() => {
        abort();
    });

    return runCallback();
}