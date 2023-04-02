<template>
  <section id="registration">

    <div id="first-stage" v-if="first_stage === true" class="register">

      <div class="register-label">
        <h1>Регистрация</h1>
      </div>

      <div class="inputs">
        <!-- Клиент часть -->
        <div class="register-item">
          <my-input v-model="login" name="login" placeholder="Логин" @input="loginInput"></my-input>
          <i class="fa fa-user"></i>
        </div>
        <div class="register-item">
          <my-input v-model="email" type="mail" name="email" placeholder="Почта" @input="emailInput"></my-input>
          <i class="fa fa-envelope"></i>
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
      </div>



      <!-- Валидационная часть -->
      <div class="validation" v-if="this.login == ''">
        <p>{{ validation1.login }}</p>
      </div>
      <div class="validation" v-else-if="this.email == ''">
        <p>{{ validation1.email }}</p>
      </div>
      <div class="validation" v-else-if="!this.email.includes('@') || !this.email.includes('.')">
        <p>{{ validation1.email_inccorect }}</p>
      </div>
      <div class="validation" v-else-if="this.password == ''">
        <p>{{ validation1.password }}</p>
      </div>
      <div class="validation" v-else-if="this.password.length < 8">
        <p>{{ validation1.password_inccorect2 }}</p>
      </div>
      <div class="validation" v-else-if="this.password_retry == ''">
        <p>{{ validation1.password_retry }}</p>
      </div>
      <div class="validation" v-else-if="this.password != this.password_retry">
        <p>{{ validation1.password_inccorect1 }}</p>
      </div>
      <div class="next_button_section validation" v-else>
        <button class="next_button" @click="firstStage">
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

    <div id="second-stage" v-if="second_stage === true" class="register">

      <div class="register-label">
        <h1>Регистрация</h1>
      </div>

      <div class="inputs">
        <!-- Клиент часть -->
        <div class="register-item">
          <label for="age">Ваш день рождения</label>
          <my-input v-model="age" type="date" name="age" placeholder="Возраст" @input="ageInput"></my-input>
        </div>
        <div class="register-item">
          <my-input v-model="phone" name="phone" placeholder="+7" type="tel" @input="phoneInput"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></my-input>
          <i class="fa fa-phone"></i>
        </div>
        <div class="register-selected">
          <v-select v-model="profession" :reduce="(option) => option.value" label="label" :options="prof_options"
            placeholder="Сфера" />
        </div>
        <div class="register-selected">
          <v-select v-model="city" :reduce="(option) => option.value" :options="city_options" placeholder="Город" />
        </div>
        <div class="register-selected">
          <v-select v-model="gender" :reduce="(option) => option.value" :options="gender_options" placeholder="Пол" />
        </div>
        <div class="register-selected">
          <v-select v-model="married" :reduce="(option) => option.value" :options="married_options" placeholder="Брак" />
        </div>
      </div>

      <!-- Валидационная часть -->
      <div class="validation" v-if="this.age == ''">
        <p>{{ validation2.age }}</p>
      </div>
      <div class="validation" v-else-if="Number(this.age.slice(0, 4)) >= Number(2017)">
        <p>{{ validation2.age_inccorect }}</p>
      </div>
      <div class="validation" v-else-if="this.phone == ''">
        <p>{{ validation2.phone }}</p>
      </div>
      <div class="validation" v-else-if="this.phone.length < 11">
        <p>{{ validation2.phone_inccorect }}</p>
      </div>
      <div class="validation" v-else-if="this.profession == ''">
        <p>{{ validation2.profession }}</p>
      </div>
      <div class="validation" v-else-if="this.city == ''">
        <p>{{ validation2.city }}</p>
      </div>
      <div class="validation" v-else-if="this.gender == ''">
        <p>{{ validation2.gender }}</p>
      </div>
      <div class="validation" v-else-if="this.married == ''">
        <p>{{ validation2.married }}</p>
      </div>
      <div class="next_button_section validation" v-else>
        <button class="next_button" @click="secondStage">
          Вперед
        </button>
      </div>

      <div class="skip validation">
        <button class="skip_button" @click="secondStage">
          Пропустить
        </button>
      </div>


    </div>

    <div id="third-stage" v-if="third_stage === true">
      <h1>Тhird stage</h1>
    </div>



  </section>
  <div class="zaglushka"></div>
</template>

<script>
import { MyInput } from "@/components/UI/MyInput.vue";
import { MyButton } from "@/components/UI/MyButton.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  setup() {
    return {
      validation1: {
        login: "Укажите ваше имя",
        email: "Укажите вашу почту",
        password: "Укажите ваш пароль",
        password_retry: "Повторите ваш пароль",
        password_inccorect1: "Пароли не совпадают",
        email_inccorect: "Почта введена неверно",
        password_inccorect2: "Пароль должен состоять минимум из 8 символов",
      },
      validation2: {
        age: "Укажите ваш возраст",
        phone: "Укажите ваш телефон",
        profession: "Укажите вашу сферу деятельности",
        married: "Укажите ваше семейное положение",
        gender: "Укажите ваш пол",
        age_inccorect: "Возраст должен быть больше 6 лет",
        phone_inccorect: "Телефон должен состоять из 11 цифр",

      },
      prof_options: [
        { label: "Школьник", value: "school" },
        { label: "Студент", value: "student" },
        { label: "Преподавательство", value: "education" },
        { label: "Управление", value: "managment" },
        { label: "Логистика", value: "logistic" },
        { label: "Продажи", value: "sales" },
        { label: "Маркетинг", value: "marketing" },
        { label: "IT", value: "it" },
        { label: "Бухгалтерия", value: "accounting" },
        { label: "Юридические услуги", value: "law" },
        { label: "Медицина", value: "medicine" },
        { label: "Строительство", value: "construction" },
        { label: "Туризм", value: "tourism" },
        { label: "Другое", value: "other" },
      ],
      gender_options: [
        { label: "Мужчина", value: "man" },
        { label: "Женщина", value: "woman" },
        { label: "Не указывать", value: "unknown" },
      ],
      married_options: [
        { label: "Женат/Замужем", value: "married" },
        { label: "Не женат/Не замужем", value: "not_married" },
        { label: "Не указывать", value: "unknown" },
      ],
      city_options: [
        { label: "Алматы", value: "Almaty" },
      ]
    };
  },
  name: "Registration",
  components: {
    MyInput,
    MyButton,
    vSelect,
  },
  methods: {
    loginInput(event) {
      console.log(event.target.value);
      this.login = event.target.value;
    },
    emailInput(event) {
      console.log(event.target.value);
      this.email = event.target.value;
    },
    passwordInput(event) {
      console.log(event.target.value);
      this.password = event.target.value;
    },
    passwordRetryInput(event) {
      console.log(event.target.value);
      this.password_retry = event.target.value;
    },
    ageInput(event) {
      console.log(event.target.value);
      this.age = event.target.value;
      console.log(Number(this.age.slice(0, 4)) > Number(2017))
    },
    genderInput(event) {
      console.log(event.target.value);
      this.gender = event.target.value;
    },
    professionInput(event) {
      this.$emit('update:profession', event.target.value)
      console.log(event.target.value);
      this.profession = event.target.value;
    },
    marriedInput(event) {
      console.log(event.target.value);
      this.married = event.target.value;
    },
    cityInput(event) {
      console.log(event.target.value);
      this.city = event.target.value;
    },
    phoneInput(event) {
      console.log(event.target.value);
      this.phone = event.target.value;
    },
    firstStage() {
      this.first_stage = false;
      this.second_stage = true;
    },
    secondStage() {
      this.second_stage = false;
      this.third_stage = true;
      console.log(this.login);
      console.log(this.password);
      console.log(this.age);
      console.log(this.gender);
      console.log(this.profession);
      console.log(this.married);
      console.log(this.city);
      console.log(this.phone);
    },


  },

  data() {
    return {
      login: "",
      email: "",
      password: "",
      password_retry: "",
      age: "",
      gender: "",
      profession: "",
      phone: "",
      city: "",
      married: "",


      first_stage: true,
      second_stage: false,
      third_stage: false,
    };
  },
};

</script>

<style>
#registration {
  background-color: #DC143C;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  color: #ffffff;

}

.register-text p {
  max-width: 80%;
  font-size: 10px;
  margin: 0 auto;
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
</style>
