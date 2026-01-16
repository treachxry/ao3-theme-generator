import type { Context } from "hono";
import { StyleSheetVariable } from "ao3-tg-shared";

export type AppContext = Context<{ Bindings: Env }>;

export const variables: StyleSheetVariable[] = [
    {
        key: '--color-base-100',
        type: 'color',
        default: 'oklch(16% 0.005 240)',
        description: 'Base color (darkest)'
    },
    {
        key: '--color-base-200',
        type: 'color',
        default: 'oklch(20% 0.005 240)',
        description: 'Base color (dark)'
    },
    {
        key: '--color-base-300',
        type: 'color',
        default: 'oklch(24% 0.005 240)',
        description: 'Base color (lighter)'
    },
    {
        key: '--color-base-content',
        type: 'color',
        default: 'oklch(88% 0.005 245)',
        description: 'Base text color'
    },
    {
        key: '--color-primary',
        type: 'color',
        default: 'oklch(40% 0.176 29.23)',
        description: 'Primary color'
    },
    {
        key: '--color-primary-content',
        type: 'color',
        default: 'oklch(88% 0.005 245)',
        description: 'Primary text color'
    },
    {
        key: '--color-secondary',
        type: 'color',
        default: 'oklch(75% 0.12 60)',
        description: 'Secondary color'
    },
    {
        key: '--color-secondary-content',
        type: 'color',
        default: 'oklch(14% 0.033 60)',
        description: 'Secondary text color'
    },
    {
        key: '--color-accent',
        type: 'color',
        default: 'oklch(71% 0.12 310)',
        description: 'Accent color'
    },
    {
        key: '--color-accent-content',
        type: 'color',
        default: 'oklch(14% 0.033 300)',
        description: 'Accent text color'
    },
    {
        key: '--color-neutral',
        type: 'color',
        default: 'oklch(27% 0.01 240)',
        description: 'Neutral color'
    },
    {
        key: '--color-neutral-content',
        type: 'color',
        default: 'oklch(70% 0.01 240)',
        description: 'Neutral text color'
    },
    {
        key: '--color-info',
        type: 'color',
        default: 'oklch(85% 0.085 206)',
        description: 'Info color'
    },
    {
        key: '--color-info-content',
        type: 'color',
        default: 'oklch(17% 0.017 206)',
        description: 'Info text color'
    },
    {
        key: '--color-success',
        type: 'color',
        default: 'oklch(85% 0.085 145)',
        description: 'Success color'
    },
    {
        key: '--color-success-content',
        type: 'color',
        default: 'oklch(17% 0.015 145)',
        description: 'Success text color'
    },
    {
        key: '--color-warning',
        type: 'color',
        default: 'oklch(85% 0.085 75)',
        description: 'Warning color'
    },
    {
        key: '--color-warning-content',
        type: 'color',
        default: 'oklch(17% 0.015 75)',
        description: 'Warning text color'
    },
    {
        key: '--color-error',
        type: 'color',
        default: 'oklch(85% 0.085 16)',
        description: 'Error color'
    },
    {
        key: '--color-error-content',
        type: 'color',
        default: 'oklch(17% 0.015 16)',
        description: 'Error text color'
    },
    {
        key: '--ui-density',
        type: 'number',
        default: '0.125',
        unit: 'rem',
        description: 'Space between elements'
    },
    {
        key: '--ui-roundness',
        type: 'number',
        default: '0.125',
        unit: 'rem',
        description: 'Border radius'
    },
    {
        key: '--ui-border',
        type: 'number',
        default: '1',
        unit: 'px',
        description: 'Border width'
    },
    {
        key: '--font-serif',
        type: 'text',
        default: "'Georgia', serif",
        description: 'Serif font'
    },
    {
        key: '--font-sans',
        type: 'text',
        default: "'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica', sans-serif, 'GNU Unifont'",
        description: 'Sans-serif font'
    },
    {
        key: '--font-mono',
        type: 'text',
        default: "'Monaco', 'Consolas', 'Courier', monospace",
        description: 'Monospace font'
    }
];