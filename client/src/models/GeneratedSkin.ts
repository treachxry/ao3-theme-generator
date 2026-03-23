import { SkinChunk, TaskStatus } from "common/models";

export interface GeneratedSkin {
    name: string
    timestamp: number
    status: TaskStatus
    chunks: SkinChunk[]
}
