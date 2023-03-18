import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/pages/Home.vue");
const PlacePage = () => import("@/pages/PlacePage.vue");
const NotFound = () => import("@/pages/NotFound.vue");
const Registration = () => import("@/pages/Registration.vue");
const Login = () => import("@/pages/Login.vue");


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/place/:id",
    name: "place",
    component: PlacePage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'not-found',
    component: NotFound,
  },
  {
    path: "/register",
    name: 'register',
    component: Registration,
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
