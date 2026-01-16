import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    base: '/ao3-theme-generator',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss()
    ],
    define: {
        __API_URL_DEV__: JSON.stringify('http://localhost:8787'),
        __API_URL__: JSON.stringify('https://ao3-theme-generator.treachery.workers.dev')
    }
});
