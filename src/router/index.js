import { createRouter, createWebHistory } from 'vue-router'

const PlacePage = () => import('@/pages/app/PlacePage.vue')
const PlaceReviews = () => import('@/pages/app/PlaceReviews.vue')

const Home = () => import('@/pages/app/Home.vue')
const Profile = () => import('@/pages/profile/Profile.vue')
const Trend = () => import('@/pages/app/Trend.vue')

const NotFound = () => import('@/pages/app/NotFound.vue')

const EnterRegistaration = () => import('@/pages/registration/RegistrationEnter.vue')
const ClientRegistration = () => import('@/pages/registration/ClientRegistration.vue')
const Login = () => import('@/pages/registration/Login.vue')
const Enter = () => import('@/pages/registration/Enter.vue')
const ResetPassword = () => import('@/pages/registration/ResetLogin.vue')

const Admin = () => import('@/pages/admin/Admin.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/place/:id',
    name: 'place',
    component: PlacePage,
    props: true,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/reviews/:id',
    name: 'reviews',
    component: PlaceReviews,
    props: true,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/registration',
    name: 'registration',
    component: EnterRegistaration,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/client_registration',
    name: 'client_registration',
    component: ClientRegistration,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/trend',
    name: 'trend',
    component: Trend,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { isAuth: true, admin: true, trasition: 'fade' },
  },
  {
    path: '/enter',
    name: 'enter',
    component: Enter,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/reset',
    name: 'reset',
    component: ResetPassword,
    meta: { isAuth: false, trasition: 'fade' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('user_id')
  const isAdmin = localStorage.getItem('admin_id')

  const toMeta = to.meta.transition
  const fromMeta = from.meta.transition

  if (toMeta && fromMeta && toMeta !== fromMeta) {
    document.body.classList.remove(fromMeta)
    document.body.classList.add(toMeta)
  }

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
