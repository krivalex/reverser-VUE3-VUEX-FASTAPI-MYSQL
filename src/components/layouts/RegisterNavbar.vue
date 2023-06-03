<template>
  <RingBottomNavigation class="swiper" :options="options" v-model="selected" border-color='white' title-color='white'
    badge-color='#FBC02D' icon-color='#669C35' style="background-color: black; color: white;" />
</template>

<script>

import { RingBottomNavigation } from "bottom-navigation-vue";
import { useRoute } from "vue-router";

export default {
  name: "register-navbar",
  components: { RingBottomNavigation },
  data() {
    const route = useRoute();
    return {
      selected: route.name,
      options: [
        { id: 1, icon: "fa fa-arrow-left", title: "Назад", path: { name: "home" } },
        { id: 2, icon: "fa fa-info", title: "О приложении", path: { name: "enter" } },
        { id: 3, icon: "fa fa-plus", title: "Регистрация", path: { name: "registration" } },
        { id: 4, icon: "fa fa-user", title: "Войти", path: { name: "login" } },
      ],
    }
  },
};
</script>

<style>
i {
  color: white;
}
</style>
