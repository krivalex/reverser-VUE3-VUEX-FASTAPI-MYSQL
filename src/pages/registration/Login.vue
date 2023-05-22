<template>
  <section id="login">

    <h3 class="me_white">@krivalex</h3>

    <div class="register-label">
      <h1>Добро пожаловать</h1>
      <p>"Менеджер"/"Пользователь"</p>
    </div>

    <div class="inputs">
      <!-- Клиент часть -->
      <div class="register-item">
        <my-input v-model="email_or_phone" name="login" placeholder="Почта/Телефон" @input="PhoneEmailInput"></my-input>
        <i class="fa fa-user"></i>
      </div>
      <div class="register-item">
        <my-input v-model="password" name="password" placeholder="Пароль" type="password"
          @input="passwordInput"></my-input>
        <i class="fa fa-lock"></i>
      </div>
      <div @click="redirectResetLogin" class="forward-password">
        <p>Забыли пароль?</p>
      </div>
    </div>





    <!-- Валидационная часть -->
    <div class="validation" v-if="this.email_or_phone == ''">
      <p>Укажите почту или номер телефона</p>
    </div>
    <div class="validation" v-else-if="this.password == ''">
      <p>Укажите ваш пароль</p>
    </div>
    <div class="next_button_section validation" v-else>
      <button class="next_button" @click="loginToApp">
        Войти
      </button>
    </div>

    <div class="server-validation" v-if="validation">
      <p>{{ validation }}</p>
    </div>

    <div class="register-text">
      <p>У вас еще нет аккаунта? <strong @click="redirectRegister">РЕГИСТРАЦИЯ</strong></p>
    </div>

    <div class="zaglushka"></div>

  </section>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { checkUser } from "@/api/methods";

export default {
  name: "Registration",
  components: {
    MyInput,
    MyButton,
  },
  methods: {
    PhoneEmailInput(event) {
      console.log(event.target.value);
      this.phone = event.target.value;
    },
    passwordInput(event) {
      console.log(event.target.value);
      this.password = event.target.value;
    },
    redirectLogin() {
      this.$router.push("/");
    },
    redirectRegister() {
      this.$router.push("/registration");
    },
    redirectResetLogin() {
      this.$router.push("/reset");
    },
    loginToApp() {

      const login_pack = {
        email: this.email_or_phone,
        password: this.password,
      }

      checkUser(login_pack).then((response) => {
        console.log(response);
        if (response.data.message == "User does not exist") {
          this.validation = "Пользователь не найден";
        }
        else {
          localStorage.setItem("user_id", response.data.user_id);
          this.validation = "Вы успешно авторизовались";
          this.$router.push("/");
        }


      });
    }

  },
  data() {
    return {
      email_or_phone: "",
      password: "",
      validation: false,
    };
  },
};

</script>

<style scoped>
#login {
  background: var(--main-haki-color);
  height: calc(100vh - 60px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #ffffff;

}

.register-text p {
  max-width: 100%;
  font-size: 15px;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.register-text p strong {
  font-size: 22px;
  color: #D9C5C9;
  cursor: pointer;
}

.register-label {
  font-size: 23px;
  padding-bottom: 50px;
  padding-top: 150px;
}

.register-item {
  position: relative;
}

.register-item input {
  max-width: 80%;
  height: 50px;
  border: none;
  border-radius: 50px;
  background-color: #ffffff;
  font-size: 20px;
  margin-bottom: 10px;
  position: relative;
}

.register-item i {
  position: absolute;
  right: 15%;
  top: 55%;
  transform: translateY(-50%);
  font-size: 20px;
  color: gray;
}

.validation {
  font-size: 20px;
  margin-top: 20px;
  width: 80%;
  margin: 0 auto;
}

.next_button {
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: #D9C5C9;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
}

.zaglushka {
  height: 64px;
  background-color: #DC143C;
}

.skip_button {
  width: 40%;
  height: 30px;
  border-radius: 50px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  background-color: gray;
  margin-top: 40px;
}

.inputs {
  width: 100vw;
}

.forward-password {
  font-size: 20px;
  margin-top: 7px;
  margin-bottom: 10px;
  color: lightgray;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.server-validation {
  font-size: 25px;
  margin-top: 20px;
  width: 80%;
  color: #f7f97e;
  margin: 0 auto;
}

@media screen and (min-width: 768px) {
  .input {
    width: 35%;
  }

  .register-item i {
    position: absolute;
    right: 33.5%;
    top: 53%;
    transform: translateY(-50%);
    font-size: 20px;
    color: gray;
  }

  .register-label h1 {
    font-size: 60px;
  }

  .register-label {
    padding-bottom: 10px;
    padding-top: 80px;
  }

  .forward-password {
    font-size: 30px;
  }

  .register-text p {
    font-size: 20px;
  }

  .register-text p strong {
    font-size: 30px;
  }

  .next_button {
    width: 35%;
    height: 70px;
    border-radius: 50px;
    background-color: #D9C5C9;
    color: black;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    border: 0px;
  }


}
</style>
