<template>
  <SwipeBottomNavigation class="swiper" :options="options" v-model="selected" swiper-color='#FFFFFF'
    background-color='#DC143C' icon-color='#FFFFFF' style="transform-y: scale(0.5)" />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "mobile-component",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fa fa-home", title: "Главная", path: { name: "home" } },
      { id: 2, icon: "fa fa-fire", title: "Рекомендации", path: { name: "trend" } },
      { id: 3, icon: "fa fa-user", title: "Профиль", path: { name: "profile" } },
    ],
    swiperColor: '#8066C7',
    backgroundColor: '#ed7979',
    iconColor: '#ffffff7',
  }),
};
</script>

<style>
@media screen and (min-width: 768px) {
  .vue-bottom-navigation {
    display: none;
  }
}
</style>
