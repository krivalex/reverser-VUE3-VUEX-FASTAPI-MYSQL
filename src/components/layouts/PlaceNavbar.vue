<template>
  <SwipeBottomNavigation :options="options" v-model="selected" swiper-color='#FFFFFF' background-color='#DC143C'
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
        selected: 1,
        options: [
          { id: 1, icon: "fa fa-backward", title: "Назад", path: { name: "home" } },
          { id: 2, icon: "fa fa-book", title: "О заведении", path: { name: "place" } },
          { id: 3, icon: "fa fa-check", title: "Отзывы", path: { name: "reviews", params: { id: route.params.id } } },
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
