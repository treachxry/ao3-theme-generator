import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

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
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __BUILD_DATE__: new Date(),
        __URL_BASE__: JSON.stringify('/ao3-theme-generator'),
        __API_URL_DEV__: JSON.stringify('http://localhost:8787'),
        __API_URL__: JSON.stringify('https://ao3-theme-generator.treachery.workers.dev')
    }
});
