export function useAbort(controller: AbortController = new AbortController()) {
    async function runAbortable<T>(callback: (signal: AbortSignal) => Promise<T>): Promise<T | undefined> {
        return new Promise(async (resolve, reject) => {
            controller.signal.addEventListener('abort', _ => {
                reject(controller.signal.reason);
            });

            try {
                const result = await callback(controller.signal);
                resolve(result);
            }
            catch(e) {
                reject(e);
            }
        });
    }

    function abort() {
        controller.abort();
    }

    return {
        runAbortable,
        abort
    };
}