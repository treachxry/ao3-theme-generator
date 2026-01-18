import { HtmlPageInfo } from "./pages";
import { CssFileResult, CssVariableInfo } from "./stylesheets";

export type AssetsResponse = {
    stylesheets: CssFileResult[]
    variables: CssVariableInfo[]
}

export type PageResponse = {
    page: HtmlPageInfo
}

export type GenerateResponse = {
    stylesheets: CssFileResult[]
}