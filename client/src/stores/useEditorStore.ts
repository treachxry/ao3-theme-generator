import { computed, ComputedRef, Ref } from "vue";
import { useStorageRef } from "@/composables/useStorageRef";
import { useSingleton } from "@/composables/useSingleton";
import { useVariableStylesheet } from "@/composables/useVariableStylesheet";
import { fetchTheme } from "@/functions/api";
import { createMediaQueryWrapped } from "common/functions";
import { CssAsset, Theme, ThemeInfo, BuildStatus, GeneratedTheme } from "common/models";

export interface IEditorStore {
    resetVariables: () => void
    createTheme: () => Promise<void>
    variables: Ref<Record<string, string>>
    generatedThemes: Ref<GeneratedTheme[]>
    theme: ComputedRef<Theme>
    previewStyles: ComputedRef<CSSStyleSheet[]>
}

export interface IEditorStoreInitState {
    stylesheets: CssAsset[]
    theme: Theme
}

const {initializeComposable, useComposable} = useSingleton(useEditorStore);

export {
    initializeComposable as initializeEditorStore,
    useComposable as useEditorStore
}

function useEditorStore(state: IEditorStoreInitState): IEditorStore {
    const theme = computed(() => state.theme);
    const variables = useStorageRef('tg-variables', getDefaultVariables);
    const generatedThemes = useStorageRef<GeneratedTheme[]>('tg-theme-outputs', () => []);
    const themeSheet = useVariableStylesheet(variables, getUnit);

    const previewStyles = computed(() => [
        themeSheet.value,
        ...state.stylesheets.map(s => createMediaQueryWrapped(s.media, s.content))
    ]);

    function getDefaultVariables(): Record<string, string> {
        return themeToVariableMap(theme.value);
    }

    function resetVariables(): void {
        variables.value = getDefaultVariables();
    }

    function themeToVariableMap(theme: Theme): Record<string, string> {
        const results: Record<string, string> = {};

        theme.colors?.forEach(group => {
            group.items.forEach(p => {
                results[p.key] = p.value;
            });
        });

        theme.sizes.forEach(p => {
            results[p.key] = String(p.value);
        });

        theme.radius.forEach(p => {
            results[p.key] = String(p.value);
        });

        theme.fonts.forEach(p => {
            results[p.key] = String(p.value);
        });

        return results;
    }

    function getUnit(key: string): string {
        const size = theme.value.sizes.find(x => x.key === key);

        if(size) {
            return size.unit;
        }

        const radius = theme.value.radius.find(x => x.key === key);

        if(radius) {
            return radius.unit;
        }

        return '';
    }

    async function createTheme(): Promise<void> {
        try {
            const result = await generateTheme(variables.value);

            const generated: GeneratedTheme = {
                name: 'Unnamed theme',
                timestamp: Date.now(),
                status: BuildStatus.Completed,
                stylesheets: result.stylesheets
            };

            generatedThemes.value.push(generated);
        }
        catch(err) {
            console.error(err);
        }
    }

    async function generateTheme(variables: Record<string, string>) {
        const entries = Object.entries(variables);

        const response = await fetchTheme(entries);

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        const data: ThemeInfo = await response.json();

        return {
            variables: entries,
            stylesheets: data.stylesheets
        };
    }

    return {
        resetVariables,
        createTheme,
        variables,
        generatedThemes,
        theme,
        previewStyles
    };
}