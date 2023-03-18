<template>
  <div v-if="validation === false" class="register">
    <div class="register-item">
      <label class="label label-phone" for="phone">Номер телефона: </label>
      <my-input v-model="phone" type="tel" name="phone" placeholder="Номер" @input="phoneInput"></my-input>
    </div>
    <div class="register-item">
      <label class="label label-password" for="password">Пароль: </label>
      <my-input v-model="password" name="password" placeholder="Пароль" type="password" @input="passwordInput"></my-input>
    </div>
    <div v-if="this.phone == ''">
      <p>Укажите ваш номер телефона</p>
    </div>
    <div v-else-if="this.password == ''">
      <p>Укажите ваш пароль</p>
    </div>
    <div v-else>
      <my-button @click="() => this.validation = true">
        Войти
      </my-button>
    </div>
  </div>
  <div v-else>
    <h1>Тут будет редирект на главную и функция которая будет входить</h1>
  </div>
</template>

<script>
import { MyInput } from "@/components/UI/MyInput.vue";
import { MyButton } from "@/components/UI/MyButton.vue";

export default {
  name: "Registration",
  components: {
    MyInput,
    MyButton,
  },
  methods: {
    phoneInput(event) {
      console.log(event.target.value);
      this.phone = event.target.value;
    },
    passwordInput(event) {
      console.log(event.target.value);
      this.password = event.target.value;
    },

  },
  data() {
    return {
      phone: "",
      password: "",
      validation: false,
    };
  },
};

</script>

<style>
</style>
