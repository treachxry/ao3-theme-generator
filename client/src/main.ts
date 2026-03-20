import { createApp } from "vue";
import "@/assets/style.css";
import App from "@/components/layout/App.vue";
import { router } from "@/routes";

createApp(App)
    .use(router)
    .mount('#app');