<template>
  <SwipeBottomNavigation :options="options" v-model="selected" swiper-color='#FFFFFF' background-color='#FD6D6D'
    icon-color='#FFFFFF' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "mobile-component",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fa fa-home", title: "Главная", path: { name: "Home" } },
      { id: 2, icon: "fa fa-fire", title: "В тренде", path: { name: "Trend" } },
      { id: 3, icon: "fa fa-heart", title: "Любимое", path: { name: "Favorite" } },
      { id: 4, icon: "fa fa-user", title: "Профиль", path: { name: "Profile" } },
    ],
    swiperColor: '#8066C7',
    backgroundColor: '#ed7979',
    iconColor: '#ffffff7'
  }),
};
</script>

<style>

</style>
