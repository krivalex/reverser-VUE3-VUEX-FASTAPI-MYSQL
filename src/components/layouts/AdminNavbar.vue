<template>
  <SwipeBottomNavigation :options="options" v-model="selected" swiper-color='white' background-color='white'
    icon-color='#DC143C' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "admin-navbar",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: [1, 2, 3, 4],
    options: [
      { id: 1, icon: "fa fa-backward", title: "Назад", path: { name: "home" } },
      { id: 2, icon: "fa fa-gear", title: "Добавить заведение", path: { name: "admin" } },
    ],
    swiperColor: '#8066C7',
    backgroundColor: '#ed7979',
    iconColor: '#ffffff7',
  }),
};
</script>

<style>
</style>
