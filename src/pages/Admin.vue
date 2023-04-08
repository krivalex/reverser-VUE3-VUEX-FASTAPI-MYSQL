<template>
  <section id="admin">

    <div class="register-label">
      <h1>Добавить заведение</h1>
    </div>

    <div class="inputs">
      <!-- Клиент часть -->
      <div class="register-item">

        <label for="name">Название заведения (MAX: 25 символов)</label>
        <p class="required">*</p>
        <my-input v-model="name" name="name" placeholder="Название заведения" @input="NameInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="city_name">Город</label>
        <my-input v-model="city_name" name="city_name" placeholder="Город" @input="CityInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="TWOgis_url">2ГИС (Ссылка)</label>
        <my-input v-model="TWOgis_url" name="TWOgis_url" placeholder="2ГИС" @input="TWOgisInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="address">Адрес Улицы (MAX: 25 символов)</label>
        <my-input v-model="address" name="address" placeholder="Адрес" @input="addressInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="phone">Whatsapp для клиентов (Номер)</label>
        <my-input v-model="phone" name="phone" placeholder="Телефон" @input="phoneInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="short_description">Короткое описание (MAX: 25 символов)</label>
        <my-input v-model="short_description" name="short_description" placeholder="Короткое описание"
          @input="shortDescriptionInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="long_description">Длинное описание (MAX: 200 символов)</label>
        <my-input v-model="long_description" name="long_description" placeholder="Длинное описание"
          @input="longDescriptionInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="instagram_link">Instagram (Ссылка)</label>
        <my-input v-model="instagram_link" name="instagram_link" placeholder="Instagram"
          @input="instagramInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="category">Категория (MAX: 18 символов)</label>
        <my-input v-model="category" name="category" placeholder="Категория" @input="categoryInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="subcategory">Подкатегория (MAX: 18 символов)</label>
        <my-input v-model="subcategory" name="subcategory" placeholder="Категория" @input="subcategoryInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="start-work-time">Начало работы (00:00:00)</label>
        <my-input v-model="start_work_time" name="start-work-time" placeholder="Время открытия"
          @input="startWorkTimeInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="end-work-time">Конец работы (00:00:00)</label>
        <my-input v-model="end_work_time" name="end-work-time" placeholder="Время закрытия"
          @input="endWorkTimeInput"></my-input>
      </div>
      <div class="register-photo">
        <label for="images">Картинки (от 1 до 10) (JPG, PNG)</label>
        <my-input v-model="images" name="images" type="file" accept=".jpg, .png" multiple="true"
          @input="endWorkTimeInput"></my-input>
      </div>
      <div class="register-label">
        <h3>Укажите 10 тегов, <br /> 10 - самый главный <br /> 1 - самый неглавный</h3>
      </div>
      <div class="register-selected">
        <label for="tag10">ТЕГ (10 баллов)</label>
        <v-select v-model="tag10" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (10 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag9">ТЕГ (9 баллов)</label>
        <v-select v-model="tag9" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (9 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag8">ТЕГ (8 баллов)</label>
        <v-select v-model="tag8" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (8 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag7">ТЕГ (7 баллов)</label>
        <v-select v-model="tag7" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (7 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag6">ТЕГ (6 баллов)</label>
        <v-select v-model="tag6" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (6 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag5">ТЕГ (5 баллов)</label>
        <v-select v-model="tag5" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (5 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag4">ТЕГ (4 баллов)</label>
        <v-select v-model="tag4" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (4 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag3">ТЕГ (3 баллов)</label>
        <v-select v-model="tag3" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (3 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag2">ТЕГ (2 баллов)</label>
        <v-select v-model="tag2" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (2 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag1">ТЕГ (1 баллов)</label>
        <v-select v-model="tag1" :reduce="(option) => option.value" :options="all_tags" placeholder="Тег (1 баллов)" />
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
      <button class="next_button" @click="redirectLogin">
        Добавить заведение
      </button>
    </div>


    <div class="zaglushka"></div>

  </section>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: 'admin',
  setup() {
    return {
      all_tags: [
        { label: "тег1", value: "tag1" },
        { label: "тег2", value: "tag2" },
        { label: "тег3", value: "tag3" },
      ],
      validation: {

      }
    }
  },
  components: {
    MyInput,
    MyButton,
    vSelect,
  },
  data() {
    return {
      email_or_phone: '',
      password: '',
    }
  },
}
</script>

<style scoped>
#admin {
  background-color: #DC143C;
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
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-text p strong {
  font-size: 22px;
  color: #D9C5C9;
}

.register-label {
  font-size: 23px;
  padding-bottom: 50px;
  padding-top: 100px;
  max-width: 80%;
  text-align: center;
  margin: 0 auto;
}

.register-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
}

.register-photo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
}

.register-photo input {
  height: 50px;
  border: none;
  font-size: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0;

}

.register-item label {
  font-size: 17px;
  max-width: 90%;
  color: lightgray;
}

.register-item input {
  max-width: 100%;
  height: 50px;
  border: none;
  border-radius: 50px;
  background-color: #ffffff;
  font-size: 20px;
  margin-bottom: 15px;
  position: relative;
  margin-top: 0px;
}


.validation {
  font-size: 20px;
  margin-top: 20px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
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


.inputs {
  width: 100vw;
}


.register-selected {
  background-color: #ffffff;
  border-radius: 50px;
  font-size: 15px;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 5px;
  padding-top: 5px;
  padding-bottom: 20px;
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

#photo-input {
  display: flex;
  justify-content: center;
  align-items: center;
}

.required {
  position: absolute;
  bottom: 1vh;
  right: 3vw;
  color: blue;
  font-size: 50px;
  z-index: 10;
}

.input-req {
  position: relative;
}
</style>

