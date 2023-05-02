import { createRouter, createWebHistory } from 'vue-router'

const PlacePage = () => import('@/pages/PlacePage.vue')
const PlaceReviews = () => import('@/pages/PlaceReviews.vue')

const Home = () => import('@/pages/Home.vue')
const Profile = () => import('@/pages/Profile.vue')
const Trend = () => import('@/pages/Trend.vue')

const NotFound = () => import('@/pages/NotFound.vue')

const Registration = () => import('@/pages/Registration.vue')
const Login = () => import('@/pages/Login.vue')
const Enter = () => import('@/pages/Enter.vue')
const ResetPassword = () => import('@/pages/ResetLogin.vue')

const Admin = () => import('@/pages/Admin.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { isAuth: false },
  },
  {
    path: '/place/:id',
    name: 'place',
    component: PlacePage,
    props: true,
    meta: { isAuth: false },
  },
  {
    path: '/reviews/:id',
    name: 'reviews',
    component: PlaceReviews,
    props: true,
    meta: { isAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { isAuth: false },
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    meta: { isAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isAuth: false },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { isAuth: true },
  },
  {
    path: '/trend',
    name: 'trend',
    component: Trend,
    meta: { isAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { isAuth: true, admin: true },
  },
  {
    path: '/enter',
    name: 'enter',
    component: Enter,
    meta: { isAuth: false },
  },
  {
    path: '/reset',
    name: 'reset',
    component: ResetPassword,
    meta: { isAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('user_id')
  const isAdmin = localStorage.getItem('admin_id')

  // Redirect to admin page if user has admin privileges
  if (to.meta.admin && isAdmin) {
    next()
  } else {
    // Redirect to login page if route requires authentication and user is not authenticated
    if (to.meta.isAuth && !isAuth) {
      next({ name: 'enter' })
    } else {
      next()
    }
  }
})

export default router
