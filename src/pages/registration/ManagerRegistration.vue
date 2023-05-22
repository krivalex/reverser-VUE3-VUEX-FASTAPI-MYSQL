<template>
  <section id="registration">
    <h3 class="me_white">@krivalex</h3>
    <div id="first-stage" v-if="first_stage === 'true'" class="register">

      <div class="register-label">
        <h1>Регистрация</h1>
        <p>"Менеджер"</p>
      </div>

      <div class="inputs">
        <!-- Клиент часть -->
        <div class="register-label-small">
          <p>Данные для аккаунта</p>
        </div>
        <div class="register-item">
          <my-input v-model="login" name="login" placeholder="Логин" @input="loginInput"></my-input>
          <i class="fa fa-user"></i>
        </div>
        <div class="register-item">
          <my-input v-model="password" name="password" placeholder="Пароль" type="password"
            @input="passwordInput"></my-input>
          <i class="fa fa-lock"></i>
        </div>
        <div class="register-item">
          <my-input v-model="password_retry" name="password_retry" placeholder="Повторите пароль"
            @input="passwordRetryInput" type="password"></my-input>
          <i class="fa fa-lock"></i>
        </div>
        <div class="register-label-small">
          <p>Данные для связи</p>
        </div>
        <div class="register-item">
          <my-input v-model="fio" name="login" placeholder="ФИО" @input="FIOInput"></my-input>
          <i class="fa fa-user"></i>
        </div>
        <div class="register-item">
          <my-input v-model="phone" type="tel" name="phone" placeholder="Телефон" @input="phoneInput"></my-input>
          <i class="fa fa-phone"></i>
        </div>
        <div class="register-item">
          <my-input v-model="email" type="mail" name="email" placeholder="Почта" @input="emailInput"></my-input>
          <i class="fa fa-envelope"></i>
        </div>
        <div class="register-label-small">
          <p>Сфера деятельности</p>
        </div>
        <div class="register-selected">
          <v-select v-model="category" :reduce="(option) => option.value" label="label" :options="category_options"
            placeholder="Сфера" />
        </div>
        <div class="register-selected">
          <v-select v-model="city" :reduce="(option) => option.value" :options="city_options" placeholder="Город" />
        </div>
      </div>



      <!-- Валидационная часть -->
      <div class="validation" v-if="this.login == ''">
        <p>{{ validation.login }}</p>
      </div>
      <div class="validation" v-else-if="this.email == ''">
        <p>{{ validation.email }}</p>
      </div>
      <div class="validation" v-else-if="!this.email.includes('@') || !this.email.includes('.')">
        <p>{{ validation.email_inccorect }}</p>
      </div>
      <div class="validation" v-else-if="this.password == ''">
        <p>{{ validation.password }}</p>
      </div>
      <div class="validation" v-else-if="this.password.length < 8">
        <p>{{ validation.password_inccorect2 }}</p>
      </div>
      <div class="validation" v-else-if="this.password_retry == ''">
        <p>{{ validation.password_retry }}</p>
      </div>
      <div class="validation" v-else-if="this.password != this.password_retry">
        <p>{{ validation.password_inccorect1 }}</p>
      </div>
      <div class="validation" v-else-if="this.fio == ''">
        <p>{{ validation.fio }}</p>
      </div>
      <div class="validation" v-else-if="this.phone == ''">
        <p>{{ validation.phone }}</p>
      </div>
      <div class="validation" v-else-if="this.category == ''">
        <p>{{ validation.category }}</p>
      </div>
      <div class="validation" v-else-if="this.city == ''">
        <p>{{ validation.city }}</p>
      </div>
      <div class="next_button_section validation" v-else>
        <button class="next_button" @click="managerRegistration">
          Вперед
        </button>
      </div>

      <div class="register-text">
        <p>Мы ценим вашу конфиденциальность и гарантируем, что ваша личная информация будет защищена. Она будет
          использоваться только для того, чтобы предоставлять вам подходящие рекомендации ресторанов. Мы не раскрываем
          вашу личную информацию третьим лицам без вашего явного согласия. Ваше имя, почта не будут использоваться для
          каких-либо других целей, кроме как для связи с вами относительно вашей учетной записи.</p>
      </div>

    </div>
    <div class="zaglushka"></div>
  </section>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { createID } from "@/api/cheeze";

export default {
  name: 'manager-registration',
  components: {
    MyInput,
    MyButton,
    vSelect,
  },
  setup() {
    return {
      validation: {
        login: "Укажите ваш логин",
        fio: "Укажите ваше ФИО",
        email: "Укажите вашу почту",
        password: "Укажите ваш пароль",
        password_retry: "Повторите ваш пароль",
        password_inccorect1: "Пароли не совпадают",
        password_inccorect2: "Пароль должен состоять минимум из 8 символов",
        email_inccorect: "Почта введена неверно",
        phone: "Укажите ваш телефон",
        category: "Укажите категорию вашей деятельности",
        age_inccorect: "Возраст должен быть больше 18 лет",
        phone_inccorect: "Телефон должен состоять из 11 цифр",
      },
      category_options: [
        { label: "Рестораны", value: "restoraunt" },
        { label: "Кафе", value: "cafe" },
        { label: "Фургончики", value: "furgon" },
        { label: "События", value: "event" },
        { label: "Временные события", value: "temp_event" },
        { label: "Другое", value: "other" },
      ],
      city_options: [
        { label: "Алматы", value: "Almaty" },
        { label: "Астана", value: "Astana" },
      ]
    }
  },
  data() {
    return {
      login: "",
      fio: "",
      password: "",
      password_retry: "",
      phone: "",
      email: "",
      age: "",
      category: "",
      city: "",
      first_stage: "true",
      second_stage: "false",
    }
  },
  methods: {
    loginInput(event) {
      this.login = event.target.value;
    },
    FIOInput(event) {
      this.fio = event.target.value;
    },
    passwordInput(event) {
      this.password = event.target.value;
    },
    passwordRetryInput(event) {
      this.password_retry = event.target.value;
    },
    phoneInput(event) {
      this.phone = event.target.value;
    },
    emailInput(event) {
      this.email = event.target.value;
    },
    ageInput(event) {
      this.age = event.target.value;
    },
    categoryInput(event) {
      this.category = event.target.value;
    },
    cityInput(event) {
      this.city = event.target.value;
    },
    async managerRegistration() {

    }

  }
}
</script>

<style scoped>
#registration {
  background-color: var(--main-haki-color);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #ffffff;

}

.register-label-small {
  font-size: 20px;
  padding-top: 10px;
}

.register-text p {
  max-width: 80%;
  font-size: 10px;
  margin: 40px auto;
  margin-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-label {
  font-size: 25px;
  padding-bottom: 50px;
  padding-top: 50px;
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
  font-size: 25px;
  margin-top: 25px;
  width: 80%;
  margin: 0 auto;
  color: #ec4967;
}

.next_button {
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: #49ec7c;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  margin-top: 15px;
}

.register-selected {
  background-color: #ffffff;
  border-radius: 50px;
  font-size: 15px;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px
}

.register-selected {
  --vs-controls-color: black;

  --vs-dropdown-bg: #ffffff;
  --vs-dropdown-color: #DC143C;
  --vs-dropdown-option-color: #DC143C;

  --vs-selected-bg: #000000;
  --vs-selected-color: #000000;

  --vs-search-input-color: gray;

  --vs-dropdown-option--active-bg: #DC143C;
  --vs-dropdown-option--active-color: #DC143C;
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

.third-stage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

#third_stage_label {
  font-size: 25px;
  padding-bottom: 10px;
  padding-top: 50px;
}

#third_stage_text {
  font-size: 15px;
  color: lightgray;
  max-width: 80%;
  margin: 0 auto;
  font-style: italic;
}

.register-tags {
  max-width: 95vw;
  margin: 0 auto;
  margin-top: 75px;
}

#third_stage_button {
  margin-top: 50px;
}

#fourth_stage_label {
  margin-top: 100px;
  padding-bottom: 0;
}

#fourth_stage_button {
  margin-top: 20px;
}

@media screen and (min-width: 768px) {
  .input {
    width: 40%;
  }

  input[type="tel"] {
    width: 100%;
  }

  input[type="date"] {
    width: 100%;
  }



  .register-item i {
    position: absolute;
    right: 32%;
    top: 55%;
    transform: translateY(-50%) translateX(50%);
    font-size: 20px;
    color: gray;
    transform-origin: center center;
  }

  .register-text {
    width: 80%;
    margin: 0 auto;
  }

  .register-text p {
    font-size: 15px;
  }

  .register-label h1 {
    font-size: 60px;
  }

  .next_button {
    width: 40%;
    height: 50px;
    border-radius: 50px;
    background-color: #D9C5C9;
    color: black;
    font-size: 25px;
    font-weight: bold;
    text-decoration: none;
    border: 0px;
    margin-top: 20px;
  }

  .register-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .phone {
    display: none;
  }


  .skip_button {
    transform: scale(2);
    margin-bottom: 80px;
  }

  .validation {
    margin-bottom: 50px;
  }
}
</style>
