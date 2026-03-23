import { SkinSchema } from "common/models";

export function getDefaultSchema(): SkinSchema {
    return {
        colors: [
            {
                name: 'base',
                items: [
                    {
                        key: '--color-base-100',
                        value: '#0b0e0f',
                        label: '100'
                    },
                    {
                        key: '--color-base-200',
                        value: '#141618',
                        label: '200'
                    },
                    {
                        key: '--color-base-300',
                        value: '#1d2021',
                        label: '300'
                    },
                    {
                        key: '--color-base-content',
                        value: '#d5d8db',
                        foreground: true
                    }
                ]
            },
            {
                name: 'primary',
                items: [
                    {
                        key: '--color-primary',
                        value: '#8f0000',
                    },
                    {
                        key: '--color-primary-content',
                        value: '#d5d8db',
                        foreground: true
                    }
                ]
            },
            {
                name: 'secondary',
                items: [
                    {
                        key: '--color-secondary',
                        value: '#e59b5b',
                    },
                    {
                        key: '--color-secondary-content',
                        value: '#130600',
                        foreground: true
                    }
                ]
            },
            {
                name: 'accent',
                items: [
                    {
                        key: '--color-accent',
                        value: '#b88cd9',
                    },
                    {
                        key: '--color-accent-content',
                        value: '#0b0615',
                        foreground: true
                    }
                ]
            },
            {
                name: 'neutral',
                items: [
                    {
                        key: '--color-neutral',
                        value: '#22272b',
                    },
                    {
                        key: '--color-neutral-content',
                        value: '#999fa4',
                        foreground: true
                    }
                ]
            },
            {
                name: 'info',
                items: [
                    {
                        key: '--color-info',
                        value: '#87dee9',
                    },
                    {
                        key: '--color-info-content',
                        value: '#061213',
                        foreground: true
                    }
                ]
            },
            {
                name: 'success',
                items: [
                    {
                        key: '--color-success',
                        value: '#abddac',
                    },
                    {
                        key: '--color-success-content',
                        value: '#0b110b',
                        foreground: true
                    },
                ]
            },
            {
                name: 'warning',
                items: [
                    {
                        key: '--color-warning',
                        value: '#efc68f',
                    },
                    {
                        key: '--color-warning-content',
                        value: '#130f08',
                        foreground: true
                    }
                ]
            },
            {
                name: 'error',
                items: [
                    {
                        key: '--color-error',
                        value: '#ffb8bb',
                    },
                    {
                        key: '--color-error-content',
                        value: '#150d0d',
                        foreground: true
                    }
                ]
            }
        ],
        fonts: [
            {
                type: 'font',
                key: '--font-serif',
                value: "'Georgia', serif",
                description: 'Serif font'
            },
            {
                type: 'font',
                key: '--font-sans',
                value: "'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica', sans-serif, 'GNU Unifont'",
                description: 'Sans-serif font'
            },
            {
                type: 'font',
                key: '--font-mono',
                value: "'Monaco', 'Consolas', 'Courier', monospace",
                description: 'Monospace font'
            }
        ],
        radius: [
            {
                type: 'number',
                key: '--ui-roundness',
                description: 'Roundness',
                value: 2,
                unit: 'px',
                min: 0,
                max: 4,
                step: 0.5,
            }
        ],
        sizes: [
            {
                type: 'number',
                key: '--ui-density',
                description: 'Spacing',
                value: 2,
                unit: 'px',
                min: 0,
                max: 5,
                step: 1
            },
            {
                type: 'number',
                key: '--ui-border',
                description: 'Border width',
                value: 1,
                unit: 'px',
                min: 1,
                max: 3,
                step: 1
            }
        ]
    };
}