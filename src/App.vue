<template>
  <div class="wrapper">
    <main class="main">
      <router-view />
    </main>
    <footer v-if="$route.name !== 'place'" class="footer">
      <footer-component />
    </footer>
    <div v-if="$route.name === 'place'">
      <place-navbar />
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

export default {
  name: "App vue",
  components: {
    FooterComponent,
    MobileComponent,
    PlaceNavbar,
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
