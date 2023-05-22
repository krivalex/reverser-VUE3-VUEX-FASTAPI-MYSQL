<template>
  <SwipeBottomNavigation class="swiper" :options="options" v-model="selected" swiper-color='#FFFFFF'
    background-color='black' icon-color='#FFFFFF' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";

export default {
  name: "client-navbar",
  components: { SwipeBottomNavigation },
  data: () => ({
    selected: 2,
    options: [
      { id: 1, icon: "fa fa-arrow-left", title: "Назад", path: { name: "home" } },
      { id: 1, icon: "fa fa-info", title: "Обо мне", path: { name: "client" } },
      { id: 2, icon: "fa fa-heart", title: "Избранное", path: { name: 'client_favourites' } },
      { id: 3, icon: "fa fa-comments", title: "Мои отзывы", path: { name: 'client_reviews' } },
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
