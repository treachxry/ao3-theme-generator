import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/routes/HomeView.vue";
import SiteSkinView from "@/routes/SiteSkinView.vue";
import WorkSkinView from "@/routes/WorkSkinView.vue";
import NotFoundView from "@/routes/NotFoundView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/site-skin', component: SiteSkinView},
    {path: '/work-skin', component: WorkSkinView},
    {path: '/:pathName(.*)', component: NotFoundView}
];

export const router = createRouter({
    history: createWebHistory(__URL_BASE__),
    routes: routes
})