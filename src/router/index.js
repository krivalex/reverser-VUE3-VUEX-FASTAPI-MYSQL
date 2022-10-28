import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/place/:id",
    component: () => import("@/pages/PlacePage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
