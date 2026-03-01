import { CssAsset } from "shared/models";

export interface GeneratedTheme {
    name: string
    timestamp: number
    status: Status
    variables: [string, string][]
    stylesheets: CssAsset[]
}

export enum Status {
    InProgress,
    Completed,
    Failed,
    Cancelled
}