import { createRouter, createWebHistory } from 'vue-router'

const PlacePage = () => import('@/pages/app/PlacePage.vue')
const PlaceReviews = () => import('@/pages/app/PlaceReviews.vue')
const PlaceMenu = () => import('@/pages/app/PlaceMenu.vue')
const PlaceMap = () => import('@/pages/app/PlaceMap.vue')
const NotFound = () => import('@/pages/app/NotFound.vue')

const Home = () => import('@/pages/app/Home.vue')
const TrendPage = () => import('@/pages/app/TrendPage.vue')
const FullMapPage = () => import('@/pages/app/FullMapPage.vue')

const ClientProfile = () => import('@/pages/client/Client.vue')
const MyReviews = () => import('@/pages/client/MyReviews.vue')
const MyFavourites = () => import('@/pages/client/MyFavourites.vue')

const ManagerProfile = () => import('@/pages/manager/Manager.vue')
const AddPlace = () => import('@/pages/manager/AddPlacePage.vue')
const EditPlace = () => import('@/pages/manager/EditPlacePage.vue')
const AnswerToReviews = () => import('@/pages/manager/AnswerToReviews.vue')

const EnterRegistaration = () => import('@/pages/registration/RegistrationEnter.vue')
const ClientRegistration = () => import('@/pages/registration/ClientRegistration.vue')
const ManagerRegistration = () => import('@/pages/registration/ManagerRegistration.vue')

const QuitPage = () => import('@/pages/app/QuitPage.vue')

const Login = () => import('@/pages/registration/Login.vue')
const Enter = () => import('@/pages/registration/Enter.vue')
const ResetPassword = () => import('@/pages/registration/ResetLogin.vue')

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
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/menu/:id',
    name: 'menu',
    component: PlaceMenu,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/map/:id',
    name: 'map',
    component: PlaceMap,
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
    path: '/manager_registration',
    name: 'manager_registration',
    component: ManagerRegistration,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/trend',
    name: 'trend',
    component: TrendPage,
    meta: { isAuth: true, trasition: 'fade' },
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
  {
    path: '/fullmap',
    name: 'fullmap',
    component: FullMapPage,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/client',
    name: 'client',
    component: ClientProfile,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/client/reviews',
    name: 'client_reviews',
    component: MyReviews,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/client/favourites',
    name: 'client_favourites',
    component: MyFavourites,
    meta: { isAuth: true, trasition: 'fade' },
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerProfile,
    meta: { isAuth: true, trasition: 'fade', admin: true },
  },
  {
    path: '/manager/add',
    name: 'add_place',
    component: AddPlace,
    meta: { isAuth: true, trasition: 'fade', admin: true },
  },
  {
    path: '/manager/edit/:id',
    name: 'edit_place',
    component: EditPlace,
    props: true,
    meta: { isAuth: true, trasition: 'fade', admin: true },
  },
  {
    path: '/manager/answer',
    name: 'answer_to_reviews',
    component: AnswerToReviews,
    meta: { isAuth: true, trasition: 'fade', admin: true },
  },
  {
    path: '/quit',
    name: 'quit',
    component: QuitPage,
    meta: { isAuth: true, trasition: 'fade' },
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
      next({ name: 'registration' })
    } else {
      next()
    }
  }
})

export default router
