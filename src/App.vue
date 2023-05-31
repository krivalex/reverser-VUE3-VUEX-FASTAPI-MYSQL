<template>
  <div class="wrapper">
    <main class="main">
      <transition name="fade">
        <router-view />
      </transition>
    </main>
    <div v-if="this.for_place.includes($route.name)">
      <place-navbar />
    </div>
    <div v-else-if="this.for_registration.includes($route.name)">
      <register-navbar />
    </div>
    <div v-else-if="this.for_client.includes($route.name)">
      <client-navbar />
    </div>
    <div v-else-if="this.for_manager.includes($route.name)">
      <manager-navbar />
    </div>
    <div v-else-if="$route.name == 'quit'">
    </div>
    <div v-else>
      <main-navbar />
    </div>
    <div class="zaglushka"></div>
  </div>
</template>

<script>
import MainNavbar from "./components/layouts/MainNavbar.vue";
import PlaceNavbar from "./components/layouts/PlaceNavbar.vue";
import RegisterNavbar from "./components/layouts/RegisterNavbar.vue";
import ManagerNavbar from "./components/layouts/ManagerNavbar.vue";
import ClientNavbar from "./components/layouts/ClientNavbar.vue";

export default {
  name: "App vue",
  components: {
    MainNavbar,
    PlaceNavbar,
    RegisterNavbar,
    ManagerNavbar,
    ClientNavbar
  },
  setup() {
    return {
      for_registration: ['registration', 'login', 'enter', 'client_registration', 'manager_registration'],
      for_place: ['place', 'reviews'],
      for_app: ['home', 'trend', 'fullmap', 'client'],
      for_client: ['client', 'client_favourites', 'client_reviews'],
      for_manager: ['manager', 'add_place', 'edit_place', 'answer_to_reviews']
    };
  },
};
</script>

<style>
/* sticky footer */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  transform: rotate3d(1, 0, 0, 0deg);
  transition: transform 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: rotate3d(1, 0, 0, 180deg);
}
</style>
