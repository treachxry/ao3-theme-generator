export function encodePageName(url: string): string {
    return `${hexEncode(url)}.html`;
}

function hexEncode(value: string) {
    const characters = [];

    for(let i = 0; i < value.length; i++) {
        const hex = value.charCodeAt(i).toString(16).padStart(2,'0');
        characters.push(hex);
    }

    return characters.join('');
}