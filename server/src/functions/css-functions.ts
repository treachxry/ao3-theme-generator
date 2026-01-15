function multiplyVariable(values: string | string[], variable: string): string {
    if (Array.isArray(values)) {
        if(values.length === 0) {
            return '0';
        }

        return values.map(value => multiplyVariable(value, variable)).join(' ');
    }

    if (values === '0' || values === 'auto') {
        return values;
    }

    return `calc(${values} * var(${variable}))`;
}

function density(...values: string[]): string {
    return multiplyVariable(values, '--ui-density');
}

function round(...values: string[]): string {
    return multiplyVariable(values, '--ui-roundness');
}

function alpha(color: string, opacity: string): string {
    if(opacity === undefined) {
        return color;
    }

    return `color-mix(in lch, ${color} ${opacity}, transparent)`
}

export default {
    density,
    round,
    alpha
}