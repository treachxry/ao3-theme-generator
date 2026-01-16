export function encodePageName(url: string): string {
    return `${encodeURIComponent(url)}.html`;
}
