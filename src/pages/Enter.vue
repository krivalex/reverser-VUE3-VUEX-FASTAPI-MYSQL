<template>
  <div class="enter-info">
    <h1>Reverser</h1>
    <p>Приложение для поиска и добавления новых мест</p>
  </div>
  <div class="enter-login">
    <my-button @click="toLogin">Войти</my-button>
    <my-button @click="toRegistration">Зарегистироваться</my-button>
  </div>
  <div class="enter-links">

  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Enter",
  components: {
    MyButton,
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegistration() {
      this.$router.push("/registration");
    },

  },
};
</script>

<style scoped>
</style>
