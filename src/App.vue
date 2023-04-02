<template>
  <div class="wrapper">
    <main class="main">
      <router-view />
    </main>
    <footer v-if="$route.name !== 'place' && $route.name !== 'registration' && $route.name !== 'login'" class="footer">
      <footer-component />
    </footer>
    <div v-if="$route.name === 'place' || $route.name === 'reviews'">
      <place-navbar />
    </div>
    <div v-else-if="$route.name === 'registration' || $route.name === 'login'">
      <register-navbar />
    </div>
    <div v-else>
      <mobile-component />
    </div>
  </div>
</template>

<script>
import FooterComponent from "./components/layouts/Footer.vue";
import MobileComponent from "./components/layouts/MainNavbar.vue";
import PlaceNavbar from "./components/layouts/PlaceNavbar.vue";
import RegisterNavbar from "./components/layouts/RegisterNavbar.vue";

export default {
  name: "App vue",
  components: {
    FooterComponent,
    MobileComponent,
    PlaceNavbar,
    RegisterNavbar,
  },

};
</script>

<style scoped>
/* sticky footer */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
</style>
