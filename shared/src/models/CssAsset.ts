import { CssAssetImportance } from "./CssAssetImportance";

export type CssAsset = {
    filename: string
    description: string
    media: string
    importance: CssAssetImportance
    content: string
}