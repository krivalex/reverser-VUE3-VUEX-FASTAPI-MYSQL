<template>
  <SwipeBottomNavigation :options="options" v-model="selected" swiper-color='white' background-color='white'
    icon-color='#DC143C' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "mobile-component",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fa fa-backward", title: "Назад", path: { name: "home" } },
      { id: 2, icon: "fa fa-plus", title: "Регистрация", path: { name: "registration" } },
      { id: 3, icon: "fa fa-user", title: "Логин", path: { name: "login" } },
    ],
    swiperColor: '#8066C7',
    backgroundColor: '#ed7979',
    iconColor: '#ffffff7',
  }),
};
</script>

<style>
</style>
