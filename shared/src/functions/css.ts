export function createMediaQueryWrapped(media: string, rules: string): string {
    return `@media ${media}{${rules}}`;
}

export function createProperty(key: string, value: string): string {
    return `${key}:${value}`;
}

export function createRule(rule: string, properties: string[]): string {
    return `${rule}{${properties.join(';')}}`;
}

export function mergeRules(rules: string[]): string {
    return rules.join('');
}
