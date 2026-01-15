import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        __API_URL_DEV__: JSON.stringify('http://localhost:8787'),
        __API_URL__: JSON.stringify('ao3-theme-generator.treachery.workers.dev')
    }
});
