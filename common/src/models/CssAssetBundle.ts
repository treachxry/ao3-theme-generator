import { CssAsset } from "./CssAsset";
import { Theme } from "../models";

export interface CssAssetBundle {
    stylesheets: CssAsset[]
    theme: Theme
}