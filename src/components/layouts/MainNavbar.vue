<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";

export default {
  name: "main-navbar",
  components: { RingBottomNavigation },
  data() {
    const route = useRoute();
    return {
      selected: route.name,
      options: [
        { id: 1, icon: "fa fa-home", title: "Главная", path: { name: "home" } },
        { id: 2, icon: "fa fa-fire", title: "Рекомендации", path: { name: "trend" } },
        { id: 3, icon: "fa fa-user", title: "Профиль", path: { name: "client" } },
      ],
    }
  }
};
</script>

<style>
</style>
