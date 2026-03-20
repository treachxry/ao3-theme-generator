import { CssAsset } from "./CssAsset";
import { BuildStatus } from "./BuildStatus";

export interface GeneratedTheme {
    name: string
    timestamp: number
    status: BuildStatus
    stylesheets: CssAsset[]
}
