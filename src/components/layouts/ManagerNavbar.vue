<template>
  <SwipeBottomNavigation class="swiper" :options="options" v-model="selected" swiper-color='#FFFFFF'
    background-color='black' icon-color='#FFFFFF' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "manager-navbar",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fa fa-sign-out", title: "Выйти", path: { name: "quit" } },
      { id: 2, icon: "fa fa-gear", title: "Мои заведения", path: { name: "manager" } },
      { id: 3, icon: "fa fa-plus", title: "Добавить заведение", path: { name: "add_place" } },
      { id: 4, icon: "fa fa-comments", title: "Отзывы", path: { name: "answer_to_reviews" } },
    ],
    swiperColor: '#8066C7',
    backgroundColor: '#ed7979',
    iconColor: '#ffffff7',
  }),
};
</script>

<style>
</style>
