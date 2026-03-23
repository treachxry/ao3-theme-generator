import { Ref } from "vue";
import { useSingleton } from "@/composables/useSingleton";
import { useStorageRef } from "@/composables/useStorageRef";
import { SkinChunk, TaskStatus } from "common/models";
import { GeneratedSkin } from "@/models/GeneratedSkin";

const {initializeComposable, useComposable} = useSingleton(useSkinStore);

export {
    initializeComposable as initializeSkinStore,
    useComposable as useSkinStore
}

interface ISkinStore {
    skins: Readonly<Ref<GeneratedSkin[]>>
    createSkin: (name: string, chunks: SkinChunk[]) => void
    removeSkin: (index: number) => void
    clearSkins: () => void
}

function useSkinStore(storageKey: string): ISkinStore {
    const skins = useStorageRef<GeneratedSkin[]>(storageKey, () => []);

    function createSkin(name: string, chunks: SkinChunk[]): void {
        const skin: GeneratedSkin = {
            name: name,
            timestamp: Date.now(),
            status: TaskStatus.Completed,
            chunks: chunks
        };

        skins.value.push(skin);
    }

    function removeSkin(index: number): void {
        skins.value.splice(index, 1);
    }

    function clearSkins(): void {
        skins.value = [];
    }

    return {
        skins,
        createSkin,
        removeSkin,
        clearSkins
    };
}