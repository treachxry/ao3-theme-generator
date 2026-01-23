import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "@/routes/HomeView.vue";
import SiteSkinEditorView from "@/routes/SiteSkinEditorView.vue";
import WorkSkinEditorView from "@/routes/WorkSkinEditorView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/site-skin', component: SiteSkinEditorView},
    {path: '/work-skin', component: WorkSkinEditorView}
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})