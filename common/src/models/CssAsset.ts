import { AssetImportance } from "./AssetImportance";

export type CssAsset = {
    filename: string
    description: string
    media: string
    importance: AssetImportance
    content: string
}