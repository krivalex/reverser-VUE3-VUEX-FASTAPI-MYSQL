<template>
  <SwipeBottomNavigation :options="options" v-model="selected" swiper-color='#FFFFFF' background-color='black'
    icon-color='#FFFFFF' />
</template>

<script>

import { SwipeBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";

export default {
  name: "place-navbar",
  components: { SwipeBottomNavigation },
  data() {
    const route = useRoute();
    return (
      {
        selected: 2,
        options: [
          { id: 1, icon: "fa fa-arrow-left", title: "Назад", path: { name: "home" } },
          { id: 2, icon: "fa fa-book", title: "О заведении", path: { name: "place" } },
          { id: 3, icon: "fa fa-comments", title: "Отзывы", path: { name: "reviews" } },
          { id: 4, icon: "fa fa-cutlery", title: "Меню", path: { name: "map" } },
          { id: 5, icon: "fa fa-map", title: "Карта", path: { name: "contacts" } },
        ],
        swiperColor: '#8066C7',
        backgroundColor: '#ed7979',
        iconColor: '#ffffff7'
      }
    )
  }
};
</script>

<style>
</style>
