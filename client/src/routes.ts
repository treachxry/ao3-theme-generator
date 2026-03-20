import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import("@/pages/home/HomePage.vue")
    },
    {
        path: '/editor',
        component: () => import("@/pages/editor/EditorPage.vue")
    },
    {
        path: '/skins',
        component: () => import("@/pages/skins/SkinsPage.vue")
    },
    {
        path: '/:pathName(.*)',
        component: () => import("@/components/NotFound.vue")
    }
];

export const router = createRouter({
    history: createWebHistory(__URL_BASE__),
    routes: routes
})