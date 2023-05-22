<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "main-navbar",
  components: { RingBottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fa fa-home", title: "Главная", path: { name: "home" } },
      { id: 2, icon: "fa fa-fire", title: "Рекомендации", path: { name: "trend" } },
      { id: 3, icon: "fa fa-user", title: "Профиль", path: { name: "client" } },
    ],
  }),
};
</script>

<style>
</style>
