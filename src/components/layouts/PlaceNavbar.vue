<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";

export default {
  name: "place-navbar",
  components: { RingBottomNavigation },
  data() {
    const route = useRoute();
    return (
      {
        selected: route.name,
        options: [
          { id: 1, icon: "fa fa-arrow-left", title: "Назад", path: { name: "home" } },
          { id: 2, icon: "fa fa-book", title: "О заведении", path: { name: "place" } },
          { id: 3, icon: "fa fa-comments", title: "Отзывы", path: { name: "reviews" } },
          { id: 4, icon: "fa fa-cutlery", title: "Меню", path: { name: "menu" } },
          { id: 5, icon: "fa fa-map", title: "Карта", path: { name: "map" } },
        ],
      }
    )
  }
};
</script>

<style>
</style>
