export async function fetchAPI(path: string, init?: RequestInit): Promise<Response> {
    const base = import.meta.env.DEV ? __API_URL_DEV__ : __API_URL__;
    const url = new URL(path, base);

    return fetch(url, init);
}