import { CssFileInfo, CssVariableInfo } from "ao3-tg-shared";



export const variables: CssVariableInfo[] = [
    {
        name: '--color-base-100',
        type: 'color',
        default: 'oklch(16% 0.005 240)',
        description: 'Base color (darkest)'
    },
    {
        name: '--color-base-200',
        type: 'color',
        default: 'oklch(20% 0.005 240)',
        description: 'Base color (dark)'
    },
    {
        name: '--color-base-300',
        type: 'color',
        default: 'oklch(24% 0.005 240)',
        description: 'Base color (lighter)'
    },
    {
        name: '--color-base-content',
        type: 'color',
        default: 'oklch(88% 0.005 245)',
        description: 'Base text color'
    },
    {
        name: '--color-primary',
        type: 'color',
        default: 'oklch(40% 0.176 29.23)',
        description: 'Primary color'
    },
    {
        name: '--color-primary-content',
        type: 'color',
        default: 'oklch(88% 0.005 245)',
        description: 'Primary text color'
    },
    {
        name: '--color-secondary',
        type: 'color',
        default: 'oklch(75% 0.12 60)',
        description: 'Secondary color'
    },
    {
        name: '--color-secondary-content',
        type: 'color',
        default: 'oklch(14% 0.033 60)',
        description: 'Secondary text color'
    },
    {
        name: '--color-accent',
        type: 'color',
        default: 'oklch(71% 0.12 310)',
        description: 'Accent color'
    },
    {
        name: '--color-accent-content',
        type: 'color',
        default: 'oklch(14% 0.033 300)',
        description: 'Accent text color'
    },
    {
        name: '--color-neutral',
        type: 'color',
        default: 'oklch(27% 0.01 240)',
        description: 'Neutral color'
    },
    {
        name: '--color-neutral-content',
        type: 'color',
        default: 'oklch(70% 0.01 240)',
        description: 'Neutral text color'
    },
    {
        name: '--color-info',
        type: 'color',
        default: 'oklch(85% 0.085 206)',
        description: 'Info color'
    },
    {
        name: '--color-info-content',
        type: 'color',
        default: 'oklch(17% 0.017 206)',
        description: 'Info text color'
    },
    {
        name: '--color-success',
        type: 'color',
        default: 'oklch(85% 0.085 145)',
        description: 'Success color'
    },
    {
        name: '--color-success-content',
        type: 'color',
        default: 'oklch(17% 0.015 145)',
        description: 'Success text color'
    },
    {
        name: '--color-warning',
        type: 'color',
        default: 'oklch(85% 0.085 75)',
        description: 'Warning color'
    },
    {
        name: '--color-warning-content',
        type: 'color',
        default: 'oklch(17% 0.015 75)',
        description: 'Warning text color'
    },
    {
        name: '--color-error',
        type: 'color',
        default: 'oklch(85% 0.085 16)',
        description: 'Error color'
    },
    {
        name: '--color-error-content',
        type: 'color',
        default: 'oklch(17% 0.015 16)',
        description: 'Error text color'
    },
    {
        name: '--ui-density',
        type: 'number',
        default: '0.125',
        unit: 'rem',
        description: 'Space between elements'
    },
    {
        name: '--ui-roundness',
        type: 'number',
        default: '0.125',
        unit: 'rem',
        description: 'Border radius'
    },
    {
        name: '--ui-border',
        type: 'number',
        default: '1',
        unit: 'px',
        description: 'Border width'
    },
    {
        name: '--font-serif',
        type: 'text',
        default: "'Georgia', serif",
        description: 'Serif font'
    },
    {
        name: '--font-sans',
        type: 'text',
        default: "'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica', sans-serif, 'GNU Unifont'",
        description: 'Sans-serif font'
    },
    {
        name: '--font-mono',
        type: 'text',
        default: "'Monaco', 'Consolas', 'Courier', monospace",
        description: 'Monospace font'
    }
];

export const sheets: CssFileInfo[] = [
    {
        description: 'General',
        media: 'all',
        filename: 'media-all.css',
        importance: 'required'
    },
    {
        description: 'Midsize',
        media: 'only screen and (max-width: 62em)',
        filename: 'media-midsize.css',
        importance: 'recommended'
    },
    {
        description: 'Narrow',
        media: 'only screen and (max-width: 42em)',
        filename: 'media-narrow.css',
        importance: 'recommended'
    },
    {
        description: 'Aural',
        media: 'speech',
        filename: 'media-aural.css',
        importance: 'optional'
    },
    {
        description: 'Print',
        media: 'print',
        filename: 'media-print.css',
        importance: 'optional'
    }
];