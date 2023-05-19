import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import directives from './directives'
import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import SwipeNavigationVue from 'bottom-navigation-vue'
import 'swiper/swiper-bundle.css'
import '@/assets/styles/main.css'
import 'bottom-navigation-vue/dist/style.css'
import 'animate.css'
import VueSocialSharing from 'vue-social-sharing'

import store from './store'

library.add(faUserSecret)

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(VueSocialSharing)
app.use(SwipeNavigationVue)
app.use(store)
app.use(router).mount('#app')
