// assets

export type AssetsResponse = {
    stylesheets: StyleSheetInfo[]
    variables: StyleSheetVariable[]
}

export type StyleSheetInfo = {
    name: string
    media: string
    contents: string
    importance: StyleSheetImportance
}

export type StyleSheetImportance = 'optional' | 'recommended' | 'required'

export type StyleSheetVariable = {
    key: string
    description: string
    default: string
    unit?: string
    type: StyleSheetVariableType
}

export type StyleSheetVariableType = 'color' | 'number' | 'text'

// pages

export type PageResponse = {
    url: string
    html: string
}

// generate

export type GenerateResponse = {
    stylesheets: StyleSheetInfo[]
}