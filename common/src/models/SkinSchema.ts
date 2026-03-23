export type SkinSchema = {
    colors: ColorGroup[]
    radius: NumberVariable[]
    sizes: NumberVariable[]
    fonts: FontVariable[]
}

export type BaseVariable = {
    key: string
    description: string
}

export type ColorGroup = {
    name: string
    items: ColorVariable[]
}

export type ColorVariable = Omit<BaseVariable, 'description'> & {
    value: string
    foreground?: boolean
    label?: string
}

export type NumberVariable = BaseVariable & {
    type: 'number'
    value: number
    unit: string
    min: number
    max: number
    step: number
}

export type FontVariable = BaseVariable & {
    type: 'font'
    value: string
}