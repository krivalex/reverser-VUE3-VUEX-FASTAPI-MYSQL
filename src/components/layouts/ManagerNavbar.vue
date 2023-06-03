<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";

export default {
  name: "manager-navbar",
  components: { RingBottomNavigation },
  data() {
    const route = useRoute();
    return {
      selected: route.name,
      options: [
        { id: 1, icon: "fa fa-sign-out", title: "Выйти", path: { name: "quit" } },
        { id: 2, icon: "fa fa-gear", title: "Мои заведения", path: { name: "manager" } },
        { id: 3, icon: "fa fa-plus", title: "Добавить", path: { name: "add_place" } },
        { id: 4, icon: "fa fa-comments", title: "Отзывы", path: { name: "answer_to_reviews" } },
      ],
    }
  },
};
</script>

<style>
</style>
