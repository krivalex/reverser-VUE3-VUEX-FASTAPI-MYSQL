import { createRouter, createWebHistory } from "vue-router";


const PlacePage = () => import("@/pages/PlacePage.vue");
const PlaceReviews = () => import("@/pages/PlaceReviews.vue");

const Home = () => import("@/pages/Home.vue");
const Profile = () => import("@/pages/Profile.vue");


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
    props: true,
  },
  {
    path: "/reviews/:id",
    name: "reviews",
    component: PlaceReviews,
    props: true,
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
  {
    path: "/profile",
    name: 'profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
