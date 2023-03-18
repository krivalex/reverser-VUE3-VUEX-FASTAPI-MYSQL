import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/pages/Home.vue");
const PlacePage = () => import("@/pages/PlacePage.vue");
const NotFound = () => import("@/pages/NotFound.vue");
const Registration = () => import("@/pages/Registration.vue");
// const Trend = () => import("@/pages/Trend.vue");
// const Profile = () => import("@/pages/Profile.vue");
// const Login = () => import("@/pages/Login.vue");
// const Register = () => import("@/pages/Register.vue");
// const Favorite = () => import("@/pages/Favorite.vue");

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/place/:id",
    component: PlacePage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
  {
    path: "/register",
    component: Registration,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
