import MainPage from "@/pages/MainPage";
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import PlaceIdInfo from "@/pages/PlaceIdInfo";

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/place/:id',
    component: PlaceIdInfo
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router
