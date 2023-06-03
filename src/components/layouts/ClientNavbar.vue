<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";


export default {
  name: "client-navbar",
  components: { RingBottomNavigation },
  data() {
    const route = useRoute();
    return {
      selected: route.name,
      options: [
        { id: 1, icon: "fa fa-arrow-left", title: "Назад", path: { name: "home" } },
        { id: 1, icon: "fa fa-info", title: "Обо мне", path: { name: "client" } },
        { id: 2, icon: "fa fa-heart", title: "Избранное", path: { name: 'client_favourites' } },
        { id: 3, icon: "fa fa-comments", title: "Мои отзывы", path: { name: 'client_reviews' } },
      ],
    }
  },
};
</script>

<style>
</style>
