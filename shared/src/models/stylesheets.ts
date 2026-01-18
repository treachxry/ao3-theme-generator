export type CssFileInfo = {
    filename: string
    description: string
    media: string
    importance: CssFileImportance
}

export type CssFileResult = CssFileInfo & {
    css: string
}

export type CssFileImportance = 'optional' | 'recommended' | 'required'

export type CssVariableInfo = {
    name: string
    description: string
    default: string
    unit?: string
    type: CssVariableType
}

export type CssVariableType = 'color' | 'number' | 'text'
