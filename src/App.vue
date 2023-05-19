<template>
  <div class="wrapper">
    <main class="main">
      <router-view />
    </main>
    <div v-if="this.for_place.includes($route.name)">
      <place-navbar />
    </div>
    <div v-else-if="this.for_registration.includes($route.name)">
      <register-navbar />
    </div>
    <div v-else-if="$route.name === 'admin'">
      <admin-navbar />
    </div>
    <div v-else>
      <mobile-component />
    </div>
  </div>
</template>

<script>
import FooterComponent from "./trash/Footer.vue";
import MobileComponent from "./components/layouts/MainNavbar.vue";
import PlaceNavbar from "./components/layouts/PlaceNavbar.vue";
import RegisterNavbar from "./components/layouts/RegisterNavbar.vue";
import AdminNavbar from "./components/layouts/AdminNavbar.vue";

export default {
  name: "App vue",
  components: {
    FooterComponent,
    MobileComponent,
    PlaceNavbar,
    RegisterNavbar,
    AdminNavbar,
  },
  setup() {
    return {
      for_registration: ['registration', 'login', 'enter', 'client_registration', 'manager_registration'],
      for_place: ['place', 'reviews'],
    };
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
