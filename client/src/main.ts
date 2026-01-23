import { createApp } from "vue";
import "@/assets/style.css";
import App from "@/components/App.vue";
import { router } from "@/routes.ts";

createApp(App)
    .use(router)
    .mount('#app');