import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/routes/HomeView.vue";
import SiteSkinEditorView from "@/routes/SiteSkinEditorView.vue";
import WorkSkinEditorView from "@/routes/WorkSkinEditorView.vue";
import NotFoundView from "@/routes/NotFoundView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/site-skin', component: SiteSkinEditorView},
    {path: '/work-skin', component: WorkSkinEditorView},
    {path: '/:pathName(.*)', component: NotFoundView}
];

export const router = createRouter({
    history: createWebHistory(__URL_BASE__),
    routes: routes
})