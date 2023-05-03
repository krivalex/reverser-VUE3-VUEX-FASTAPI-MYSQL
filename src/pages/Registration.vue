<template>
  <section id="registration">
    <h3 class="me_white">@krivalex</h3>
    <div id="first-stage" v-if="first_stage === 'true'" class="register">

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

    <div id="second-stage" v-if="second_stage === 'true'" class="register">

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
          <i class="phone fa fa-phone"></i>
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

      <div class="skip validation" v-if="this.phone.length < 11">
        <button class="skip_button" @click="secondStage">
          Пропустить
        </button>
      </div>


    </div>

    <div id="third-stage" v-if="third_stage === 'true'">
      <!-- Клиент часть -->
      <div class="register-label" id="third_stage_label">
        <h1>Выберите теги</h1>
      </div>
      <div class="register-text" id="third_stage_text">
        <h3>Отметьте теги, которые наиболее подходят вам</h3>
      </div>
      <div class="register-tags">
        <input-line :tags="tags" @selected="filterOnSelect"></input-line>
      </div>
      <!-- Валидационная часть -->
      <div class="next_button_section validation" id="third_stage_button">
        <button class="next_button" @click="thirdStage">
          Вперед
        </button>
      </div>
    </div>

    <div id="fourth-stage" v-if="fourth_stage === 'true'">
      <div class="register-label" id="fourth_stage_label">
        <h1>Вы успешно зарегистировались</h1>
      </div>
      <div class="next_button_section validation" id="fourth_stage_button">
        <button class="next_button" @click="fourthStage">
          Начать пользоваться
        </button>
      </div>
    </div>



  </section>
  <div class="zaglushka"></div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import InputLine from "@/components/InputLine.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { createID } from "@/api/cheeze";
import { postUser, allTags, getPlaces } from "@/api/methods";

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
    InputLine,
  },
  methods: {
    loginInput(event) {
      this.login = event.target.value;
      localStorage.setItem('login', this.login)
    },
    emailInput(event) {
      this.email = event.target.value;
      localStorage.setItem('email', this.email)
    },
    passwordInput(event) {
      this.password = event.target.value;
      localStorage.setItem('password', this.password)
    },
    passwordRetryInput(event) {
      this.password_retry = event.target.value;
      localStorage.setItem('password_retry', this.password_retry)
    },
    ageInput(event) {
      this.age = event.target.value;
      localStorage.setItem('age', this.age)
    },
    genderInput(event) {
      this.gender = event.target.value;
      localStorage.setItem('gender', this.gender)
    },
    professionInput(event) {
      this.$emit('update:profession', event.target.value)
      this.profession = event.target.value;
      localStorage.setItem('profession', this.profession)
    },
    marriedInput(event) {
      this.married = event.target.value;
      localStorage.setItem('married', this.married)
    },
    cityInput(event) {
      this.city = event.target.value;
      localStorage.setItem('city', this.city)
    },
    phoneInput(event) {
      this.phone = event.target.value;
      localStorage.setItem('phone', this.phone)
    },
    firstStage() {
      this.first_stage = false;
      this.second_stage = true;
      localStorage.setItem('first_stage', this.first_stage)
      localStorage.setItem('second_stage', this.second_stage)
      this.first_stage = localStorage.getItem('first_stage')
      this.second_stage = localStorage.getItem('second_stage')


    },
    secondStage() {
      this.second_stage = false;
      this.third_stage = true;
      localStorage.setItem('second_stage', this.second_stage)
      localStorage.setItem('third_stage', this.third_stage)
      this.second_stage = localStorage.getItem('second_stage')
      this.third_stage = localStorage.getItem('third_stage')

      console.log(this.places)
    },
    thirdStage() {
      this.third_stage = false;
      this.fourth_stage = true;
      localStorage.setItem('third_stage', this.third_stage)
      localStorage.setItem('fourth_stage', this.fourth_stage)
      this.third_stage = localStorage.getItem('third_stage')
      this.fourth_stage = localStorage.getItem('fourth_stage')

      const id = createID()

      function arrayToObject(array) {
        return array.reduce((obj, item, index) => {
          obj[index] = item;
          return obj;
        }, {});
      }

      const data = {
        user_id: id,
        login: localStorage.getItem('login'),
        password: localStorage.getItem('password'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email'),
        age: localStorage.getItem('age'),
        profession: this.profession,
        married: this.married,
        gender: this.gender,
        city: this.city,
        preferences: arrayToObject(this.filteredTags),
        info_show: false,
        coins: 0,
        status: "client",
        anchors: {},
        favourites: "",
        rewards: {},
        recommendations: null,
      }

      postUser(data).then((res) => {
        console.log(res)
      })

      localStorage.setItem('user_id', id)
    },
    fourthStage() {
      this.$router.push(`/`);
    },
    filterOnSelect(tagsList) {
      this.filteredTags = tagsList;
    },


  },

  data() {
    return {
      login: "",
      password: "",
      phone: "",
      email: "",
      age: "",
      profession: "",
      married: "",
      gender: "",
      city: "",
      preferences: [],


      first_stage: localStorage.getItem('first_stage') ? localStorage.getItem('first_stage') : 'true',
      second_stage: localStorage.getItem('second_stage') ? localStorage.getItem('second_stage') : 'false',
      third_stage: localStorage.getItem('third_stage') ? localStorage.getItem('third_stage') : 'false',
      fourth_stage: localStorage.getItem('fourth_stage') ? localStorage.getItem('fourth_stage') : 'false',

      password_retry: "",
      filteredTags: [],
      all_tags: [],
      view_places: [],
      all_places: [],

      places: allTags().then(
        (res) => {
          const data = res.data.tags;
          return data;
        },
        (err) => {
          console.log(err);
        }
      )
    };
  },
  computed: {
    async tags() {
      const res = await this.places;
      const uniqueTags = {};
      for (const [key, value] of Object.entries(res)) {
        for (const tag of value) {
          if (tag !== '') {
            if (!uniqueTags[tag]) {
              uniqueTags[tag] = [];
            }
            uniqueTags[tag].push(value);
          }
        }
      }
      this.all_tags = Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat()
      return Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat();
    },
    filteredPlaces() {
      if (!this.filteredTags.length) {
        return this.all_places.slice(0, 10);
      } else {
        return this.all_places.filter((place) => {
          const tagsArray = Object.values(place.tags);
          return this.filteredTags.every((tag) => tagsArray.includes(tag));
        }).slice(0, 10);
      }
    },
  }
};

</script>

<style scoped>
#registration {
  background-color: #DC143C;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
