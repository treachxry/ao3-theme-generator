async function fetchAPI(path: string, init?: RequestInit): Promise<Response> {
    const base: string = import.meta.env.DEV ? __API_URL_DEV__ : __API_URL__;
    const url: URL = new URL(path, base);

    return fetch(url, init);
}

export async function fetchPages(url: string, controller: AbortController): Promise<Response> {
    const params = new URLSearchParams({url});

    return fetchAPI(`/api/pages?${params}`, {
        signal: controller.signal
    });
}

export async function fetchAssets(): Promise<Response> {
    return fetchAPI('/api/assets');
}

export async function fetchTheme(values: [string, string][]): Promise<Response> {
    const body = JSON.stringify(values);

    return fetchAPI('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    });
}