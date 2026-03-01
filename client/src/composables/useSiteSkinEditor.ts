import { computed } from "vue";
import { useStorageRef } from "@/composables/useStorageRef";
import { useSingleton } from "@/composables/useSingleton";
import { getPreviewStyleSheets, themeToVariableMap } from "@/functions/css-utils";
import { fetchTheme } from "@/functions/api";
import { GeneratedTheme, Status } from "@/models/GeneratedTheme";
import { CssAsset, Theme, ThemeInfo } from "shared/models";

const {initializeComposable, useComposable} = useSingleton(useSiteSkinEditor);

export {
    initializeComposable as initializeSiteSkinEditor,
    useComposable as useSiteSkinEditor
}

export interface SiteSkinEditorState {
    stylesheets: CssAsset[]
    theme: Theme
}

function useSiteSkinEditor(state: SiteSkinEditorState) {
    const stylesheets = computed<CssAsset[]>(() => state.stylesheets);
    const theme = computed<Theme>(() => state.theme);
    const previewStyles = computed<CSSStyleSheet[]>(getPreviewStyles);

    const generatedThemes = useStorageRef('tg-theme-outputs', getDefaultOutputs);
    const activeVariables = useStorageRef('tg-variables', getDefaultVariables);

    function getDefaultVariables() {
        return themeToVariableMap(theme.value);
    }

    function getDefaultOutputs(): GeneratedTheme[] {
        return [];
    }

    function resetActiveVariables(): void {
        activeVariables.value = getDefaultVariables();
    }

    function getPreviewStyles(): CSSStyleSheet[] {
        return getPreviewStyleSheets(stylesheets.value, theme.value, activeVariables.value);
    }

    async function createTheme(): Promise<void> {
        const variables = Object.entries(activeVariables.value);

        const response = await fetchTheme(variables);

        if(!response.ok) {
            console.error(response.statusText);
            return;
        }

        const data: ThemeInfo = await response.json();

        const generated: GeneratedTheme = {
            name: 'Unnamed theme',
            timestamp: Date.now(),
            status: Status.Completed,
            variables: variables,
            stylesheets: data.stylesheets
        };

        generatedThemes.value.push(generated);
    }

    return {
        resetActiveVariables,
        createTheme,
        activeVariables,
        generatedThemes,
        theme,
        previewStyles
    };
}