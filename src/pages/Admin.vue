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
        <my-input v-model="city_name" name="city_name" placeholder="Город" @input="cityInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="TWOgis_url">2ГИС (Ссылка)</label>
        <my-input type="url" v-model="TWOgis_url" name="TWOgis_url" placeholder="2ГИС" @input="TWOgisInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="address">Адрес Улицы (MAX: 25 символов)</label>
        <my-input v-model="address" name="address" placeholder="Адрес" @input="addressInput"></my-input>
      </div>
      <div class="register-item">
        <p class="required">*</p>
        <label for="phone">Whatsapp для клиентов (Номер)</label>
        <my-input type="tel" v-model="phone" name="phone" placeholder="Телефон" @input="phoneInput"></my-input>
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
        <label for="start-work-time">Начало работы (00:00:00)</label>
        <my-input type="time" v-model="start_work_time" name="start-work-time" placeholder="Время открытия"
          @input="startWorkTimeInput"></my-input>
      </div>
      <div class="register-item">
        <label for="end-work-time">Конец работы (00:00:00)</label>
        <my-input type="time" v-model="end_work_time" name="end-work-time" placeholder="Время закрытия"
          @input="endWorkTimeInput"></my-input>
      </div>
      <div class="register-label">
        <h3>Укажите 10 тегов, 10 - самый главный, 1 - самый неглавный</h3>
      </div>
      <div class="register-selected">
        <label for="tag10">ТЕГ (10 баллов)</label>
        <v-select v-model="tag10" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (10 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag9">ТЕГ (9 баллов)</label>
        <v-select v-model="tag9" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (9 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag8">ТЕГ (8 баллов)</label>
        <v-select v-model="tag8" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (8 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag7">ТЕГ (7 баллов)</label>
        <v-select v-model="tag7" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (7 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag6">ТЕГ (6 баллов)</label>
        <v-select v-model="tag6" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (6 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag5">ТЕГ (5 баллов)</label>
        <v-select v-model="tag5" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (5 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag4">ТЕГ (4 баллов)</label>
        <v-select v-model="tag4" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (4 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag3">ТЕГ (3 баллов)</label>
        <v-select v-model="tag3" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (3 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag2">ТЕГ (2 баллов)</label>
        <v-select v-model="tag2" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (2 баллов)" />
      </div>
      <div class="register-selected">
        <label for="tag1">ТЕГ (1 баллов)</label>
        <v-select v-model="tag1" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (1 баллов)" />
      </div>
    </div>
    <div class="register-photo">
      <label for="images">Картинки 1 (JPG, PNG)</label>
      <form enctype="multipart/form-data">
        <my-input v-model="images1" name="file" type="file" accept=".jpg, .png" @input="imagesInput1"></my-input>
      </form>
    </div>
    <div class="register-photo">
      <label for="images">Картинки 2 (JPG, PNG)</label>
      <form enctype="multipart/form-data">
        <my-input v-model="images2" name="file" type="file" accept=".jpg, .png" @input="imagesInput2"></my-input>
      </form>
    </div>
    <div class="register-photo">
      <label for="images">Картинки 3 (JPG, PNG)</label>
      <form enctype="multipart/form-data">
        <my-input v-model="images3" name="file" type="file" accept=".jpg, .png" @input="imagesInput3"></my-input>
      </form>
    </div>

    <!-- Валидационная часть -->
    <div class="validation">
      <div class="validation-item" v-if="name == ''">
        <p>{{ validation.name }}</p>
      </div>
      <div class="validation-item" v-if="city_name == ''">
        <p>{{ validation.city_name }}</p>
      </div>
      <div class="validation-item" v-if="address == ''">
        <p>{{ validation.address }}</p>
      </div>
      <div class="validation-item" v-if="phone == ''">
        <p>{{ validation.phone }}</p>
      </div>
      <div class="validation-item" v-if="TWOgis_url == ''">
        <p>{{ validation.TWOgis_url }}</p>
      </div>
      <div class="validation-item" v-if="start_work_time == ''">
        <p>{{ validation.start_work_time }}</p>
      </div>
      <div class="validation-item" v-if="end_work_time == ''">
        <p>{{ validation.end_work_time }}</p>
      </div>
      <div class="validation-item" v-if="category == ''">
        <p>{{ validation.category }}</p>
      </div>
      <div class="validation-item" v-if="subcategory == ''">
        <p>{{ validation.subcategory }}</p>
      </div>
      <div class="validation-item">
        <button class="next_button" @click="addPlace">Добавить заведение</button>
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
import { postPlace } from "@/api/methods";
import { uploadImage } from "@/api/methods";

export default {
  name: 'admin',
  setup() {
    return {
      all_tags: [
        { label: "ресторан", value: "ресторан" },
        { label: "кафе", value: "кафе" },
        { label: "бар", value: "бар" },
        { label: "музыка", value: "музыка" },
        { label: "клуб", value: "клуб" },
        { label: "недорого", value: "недорого" },
        { label: "стейк", value: "стейк" },
        { label: "халал", value: "халал" },
        { label: "работаем ночью", value: "работаем ночью" },

      ],
      validation: {
        "name": "Укажите название заведения",
        "city_name": "Укажите город",
        "TWOgis_url": "Укажите ссылку на 2ГИС",
        "address": "Укажите адрес",
        "phone": "Укажите номер телефона",
        "category": "Укажите категорию",
        "subcategory": "Укажите подкатегорию",
        "short_description": "Укажите краткое описание",
        "long_description": "Укажите полное описание",
        "start_work_time": "Укажите время начала работы",
        "end_work_time": "Укажите время окончания работы",
        "big_address": "Адрес длинее 25 символов",
      }
    }
  },
  components: {
    MyInput,
    MyButton,
    vSelect,
  },
  methods: {
    NameInput(event) {
      this.name = event.target.value;
    },
    cityInput(event) {
      this.city_name = event.target.value;
    },
    TWOgisInput(event) {
      this.TWOgis_url = event.target.value;
    },
    addressInput(event) {
      this.address = event.target.value;
    },
    phoneInput(event) {
      this.phone = event.target.value;
    },
    categoryInput(event) {
      this.category = event.target.value;
    },
    subcategoryInput(event) {
      this.subcategory = event.target.value;
    },
    instagramInput(event) {
      this.instagram_link = event.target.value;
    },
    shortDescriptionInput(event) {
      this.short_description = event.target.value;
    },
    longDescriptionInput(event) {
      this.long_description = event.target.value;
    },
    startWorkTimeInput(event) {
      this.start_work_time = event.target.value;
    },
    endWorkTimeInput(event) {
      this.end_work_time = event.target.value;
    },
    imagesInput1(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.images1 = binary;
          // this.uploadImages.push(binary);

          // var index = Object.keys(this.uploadImages).length;
          // this.uploadImages[index] = binary;
        };
      }
    },
    imagesInput2(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.images2 = binary;
          // this.uploadImages.push(binary);

          // var index = Object.keys(this.uploadImages).length;
          // this.uploadImages[index] = binary;
        };
      }
    },
    imagesInput3(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.images3 = binary;
          // this.uploadImages.push(binary);

          // var index = Object.keys(this.uploadImages).length;
          // this.uploadImages[index] = binary;
        };
      }
    },
    addPlace() {
      const id = createID();
      const data = {
        place_id: id,
        likes: 0,
        marks: {},
        name: this.name,
        city_name: this.city_name,
        two_gis_url: this.TWOgis_url,
        geometry_name: this.address,
        instagram_link: this.instagram_link,
        phone: this.phone,
        short_description: this.short_description,
        long_description: this.long_description,
        category: this.category,
        subcategory: this.subcategory,
        start_work_time: this.start_work_time,
        end_work_time: this.end_work_time,
        tags: {
          "tag10": this.tag10,
          "tag9": this.tag9,
          "tag8": this.tag8,
          "tag7": this.tag7,
          "tag6": this.tag6,
          "tag5": this.tag5,
          "tag4": this.tag4,
          "tag3": this.tag3,
          "tag2": this.tag2,
          "tag1": this.tag1,
        },

      }
      postPlace(data).then((response) => {
        console.log(response);
        let image_pack = {
          place_id: id,
          file: this.images1,
        }

        uploadImage(image_pack).then((response) => {
          console.log(response);
        });

        image_pack = {
          place_id: id,
          file: this.images2,
        }

        uploadImage(image_pack).then((response) => {
          console.log(response);
        });

        image_pack = {
          place_id: id,
          file: this.images3,
        }

        uploadImage(image_pack).then((response) => {
          console.log(response);
        });
      });



    }
  },
  data() {
    return {
      name: "",
      city_name: "",
      TWOgis_url: "",
      address: "",
      instagram_link: "",
      phone: "",
      category: "",
      subcategory: "",
      short_description: "",
      long_description: "",
      start_work_time: "",
      end_work_time: "",
      images1: "",
      images2: "",
      images3: "",
      tag10: "",
      tag9: "",
      tag8: "",
      tag7: "",
      tag6: "",
      tag5: "",
      tag4: "",
      tag3: "",
      tag2: "",
      tag1: "",
      uploadImages: [],
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

.validation-item {
  margin-bottom: 12px;
  font-size: 20px;
}

@media screen and (min-width: 768px) {
  .register-label h1 {
    font-size: 40px;
  }

  .inputs {
    padding: 0 200px;
  }

  .required {
    position: absolute;
    bottom: 1%;
    right: 1%;
    color: blue;
    font-size: 50px;
    z-index: 10;
  }

  .register-item label {
    font-size: 30px;
  }

  .register-item input {
    max-width: 100%;
  }

  .register-item {
    margin-top: 15px;
  }

  .next_button {
    width: 500px;
    height: 60px;
    font-size: 30px;
  }

  .register-label h3 {
    width: 100%;
  }
}
</style>

