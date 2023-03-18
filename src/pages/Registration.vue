<template>
  <div class="register">
    <div class="register-item">
      <label class="label label-login" for="login">Имя: </label>
      <my-input v-model="login" name="login" placeholder="Логин" @input="loginInput"></my-input>
    </div>
    <div class="register-item">
      <label class="label label-phone" for="phone">Номер телефона: </label>
      <my-input v-model="phone" type="tel" name="phone" placeholder="Номер" @input="phoneInput"></my-input>
    </div>
    <div class="register-item">
      <label class="label label-password" for="password">Пароль: </label>
      <my-input v-model="password" name="password" placeholder="Пароль" type="password" @input="passwordInput"></my-input>
    </div>
    <div class="register-item">
      <label class="label label-password" for="password_retry">Повторите пароль: </label>
      <my-input v-model="password_retry" name="password_retry" placeholder="Повторите пароль" @input="passwordRetryInput"
        type="password"></my-input>
    </div>
    <div v-if="this.login == ''">
      <p>Укажите ваше имя</p>
    </div>
    <div v-else-if="this.phone == ''">
      <p>Укажите ваш номер телефона</p>
    </div>
    <div v-else-if="this.password == ''">
      <p>Укажите ваш пароль</p>
    </div>
    <div v-else-if="this.password !== this.password_retry">
      <p>Пароли не совпадают</p>
    </div>
    <div v-else>
      <my-button>Зарегистрироваться</my-button>
    </div>

  </div>
</template>

<script>
import { MyInput } from "@/components/UI/MyInput.vue";
import { MyButton } from "@/components/UI/MyButton.vue";
export default {
  name: "Registration",
  components: {
    MyInput,
  },
  methods: {
    loginInput(event) {
      console.log(event.target.value);
      this.login = event.target.value;
    },
    phoneInput(event) {
      console.log(event.target.value);
      this.phone = event.target.value;
    },
    passwordInput(event) {
      console.log(event.target.value);
      this.password = event.target.value;
    },
    passwordRetryInput(event) {
      console.log(event.target.value);
      this.password_retry = event.target.value;
    },
  },
  data() {
    return {
      login: "",
      phone: "",
      password: "",
      password_retry: ""
    };
  },
};

</script>

<style>
</style>
