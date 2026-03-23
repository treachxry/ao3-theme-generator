import { ChunkImportance } from "./ChunkImportance";

export type SkinChunk = {
    filename: string
    description: string
    media: string
    importance: ChunkImportance
    content: string
}