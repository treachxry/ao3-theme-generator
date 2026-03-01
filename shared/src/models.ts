export * from "./models/CssAssetBundle";
export * from "./models/HtmlAsset";
export * from "./models/CssAsset";
export * from "./models/CssAssetImportance";
export * from "./models/ThemeInfo";

export type Theme = {
    name?: string
    colors: ColorGroup[]
    radius: NumberVar[]
    sizes: NumberVar[]
    fonts: FontVar[]
    options?: ThemeOptions
}

export type FontVar = {
    key: string
    value: string
    name: string
}

export type ThemeOptions = {

}

export type ColorGroup = {
    name: string
    items: ColorVar[]
}

export type ColorVar = {
    key: string
    value: string
    isContent?: boolean
    label?: string
}

export type NumberVar = {
    key: string
    value: number
    name: string
    description: string
    unit: string
    min: number
    max: number
    step: number
}