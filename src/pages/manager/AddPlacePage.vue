<template>
  <section id="admin">

    <div class="register-label">
      <h1>Добавить заведение</h1>
    </div>

    <div class="inputs">
      <!-- Клиент часть -->
      <div class="register-item">
        <label for="name">Название заведения (MAX: 30 символов)</label>
        <my-input v-model.lazy="name" name="name" placeholder="Название заведения" @input="NameInput"></my-input>
        <div v-if="name == '' && all_validated" class="error">
          {{ toast_danger("Название", validation.name) }}
        </div>
        <div v-else-if="name !== '' && !validation_options.name_valid" class="error">
          {{ toast_danger("Название", validation.name_length) }}
        </div>
      </div>

      <div class="register-item">
        <label for="city_name">Город</label>
        <my-input v-model.lazy="city_name" name="city_name" placeholder="Город" @input="cityInput"></my-input>
        <div v-if="city_name == '' && all_validated" class="error">
          {{ toast_danger("Город", validation.city_name) }}
        </div>
      </div>
      <div class="register-item">
        <label for="address">Адрес Улицы (MAX: 25 символов)</label>
        <my-input v-model.lazy="address" name="address" placeholder="Адрес" @input="addressInput"></my-input>
        <div v-if="address == '' && all_validated" class="error">
          {{ toast_danger("Адрес", validation.address) }}
        </div>
        <div v-else-if="address.length > 25 && !validation_options.address_valid" class="error">
          {{ toast_danger("Адрес", validation.address_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="short_description">Короткое описание (MAX: 30 символов)</label>
        <my-input v-model.lazy="short_description" name="short_description" placeholder="Короткое описание"
          @input="shortDescriptionInput"></my-input>
        <div v-if="short_description == '' && all_validated" class="error">
          {{ toast_danger("Короткое описание", validation.short_description) }}
        </div>
        <div v-else-if="short_description.length > 30 && !validation_options.short_description_valid" class="error">
          {{ toast_danger("Короткое описание", validation.short_description_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="long_description">Длинное описание (MAX: 200 символов)</label>
        <my-text-area v-model.lazy="long_description" name="long_description" placeholder="Длинное описание"
          @input="longDescriptionInput"></my-text-area>
        <div v-if="long_description == '' && all_validated" class="error">
          {{ toast_danger("Длинное описание", validation.long_description) }}
        </div>
        <div v-else-if="long_description.length > 200 && !validation_options.long_description_valid" class="error">
          {{ toast_danger("Длинное описание", validation.long_description_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="TWOgis_url">2ГИС (Ссылка)</label>
        <my-input type="url" v-model="TWOgis_url" name="TWOgis_url" placeholder="2ГИС" @input="TWOgisInput"></my-input>
        <div v-if="TWOgis_url == '' && all_validated" class="error">
          {{ toast_danger("Cсылка на 2ГИС", validation.TWOgis_url) }}
        </div>
        <div v-else-if="TWOgis_url.length > 0 && !TWOgis_url.includes('2gis.kz')" class="error">
          {{ toast_danger("Cсылка на 2ГИС", validation.TWOgis_url_invalid) }}
        </div>
      </div>
      <div class="register-item">
        <label for="phone">Whatsapp для клиентов (Номер)</label>
        <my-input type="tel" placeholder="Whatsapp для клиентов" v-model.lazy="phone" name="phone"
          @input="phoneInput"></my-input>
        <div v-if="phone == '+7' && all_validated" class="error">
          {{ toast_danger("Номер телефона", validation.phone) }}
        </div>
        <div v-else-if="phone !== '+7' && !validation_options.phone_valid" class="error">
          {{ toast_danger("Номер телефона", validation.phone_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="instagram_link">Instagram (Ссылка)</label>
        <my-input v-model.lazy="instagram_link" name="instagram_link" placeholder="Instagram"
          @input="instagramInput"></my-input>
        <div v-if="instagram_link.length > 0 && !instagram_link.includes('instagram.com')" class="error">
          {{ toast_danger("Ссылка на Instagram", validation.instagram_link_invalid) }}
        </div>
      </div>
      <div class="register-item">
        <label for="category">Категория (MAX: 18 символов)</label>
        <my-input v-model.lazy="category" name="category" placeholder="Категория" @input="categoryInput"></my-input>
        <div v-if="category == '' && all_validated" class="error">
          {{ toast_danger("Категория", validation.category) }}
        </div>
        <div v-else-if="category.length > 18 && !validation_options.category_valid" class="error">
          {{ toast_danger("Категория", validation.category_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="subcategory">Подкатегория (MAX: 18 символов)</label>
        <my-input v-model.lazy="subcategory" name="subcategory" placeholder="Подкатегория"
          @input="subcategoryInput"></my-input>
        <div v-if="subcategory == '' && all_validated" class="error">
          {{ toast_danger("Подкатегория", validation.subcategory) }}
        </div>
        <div v-else-if="subcategory.length > 18 && !validation_options.subcategory_valid" class="error">
          {{ toast_danger("Подкатегория", validation.subcategory_length) }}
        </div>
      </div>
      <div class="register-item">
        <label for="start-work-time">Начало работы (00:00:00)</label>
        <my-input type="time" v-model.lazy="start_work_time" name="start-work-time" placeholder="Время открытия"
          @input.once="startWorkTimeInput"></my-input>
        <div v-if="start_work_time == '' && all_validated" class="error">
          {{ toast_danger("Начало работы", validation.start_work_time) }}
        </div>
      </div>
      <div class="register-item">
        <label for="end-work-time">Конец работы (00:00:00)</label>
        <my-input type="time" v-model.lazy="end_work_time" name="end-work-time" placeholder="Время закрытия"
          @input.once="endWorkTimeInput"></my-input>
        <div v-if="end_work_time == '' && all_validated" class="error">
          {{ toast_danger("Конец работы", validation.end_work_time) }}
        </div>
        <div
          v-else-if="end_work_time < start_work_time && validation_options.end_work_time_valid && validation_options.start_work_time_valid"
          class="error">
          {{ toast_danger("Время работы", validation_not_required.work_time) }}
        </div>
      </div>
      <div class="register-label">
        <h3>Укажите 10 тегов, 10 - самый главный, 1 - самый неглавный</h3>
      </div>
      <div class="register-selected">
        <label for="tag10">ТЕГ (10 баллов)</label>
        <v-select v-model="tag10" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (10 баллов)" />
        <div v-if="tag10 == '' && all_validated" class="error">
          {{ toast_danger("Тег (10 баллов)", validation.tag10) }}
        </div>
      </div>
      <div class="register-selected">
        <label for="tag9">ТЕГ (9 баллов)</label>
        <v-select v-model="tag9" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (9 баллов)" />
        <div v-if="tag9 == '' && all_validated" class="error">
          {{ toast_danger("Тег (9 баллов)", validation.tag9) }}
        </div>
      </div>
      <div class="register-selected">
        <label for="tag8">ТЕГ (8 баллов)</label>
        <v-select v-model="tag8" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (8 баллов)" />
        <div v-if="tag8 == '' && all_validated" class="error">
          {{ toast_danger("Тег (8 баллов)", validation.tag8) }}
        </div>
      </div>
      <div class="register-selected">
        <label for="tag7">ТЕГ (7 баллов)</label>
        <v-select v-model="tag7" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (7 баллов)" />
        <div v-if="tag7 == '' && all_validated" class="error">
          {{ toast_danger("Тег (7 баллов)", validation.tag7) }}
        </div>
      </div>
      <div class="register-selected">
        <label for="tag6">ТЕГ (6 баллов)</label>
        <v-select v-model="tag6" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (6 баллов)" />
        <div v-if="tag6 == '' && all_validated" class="error">
          {{ toast_danger("Тег (6 баллов)", validation.tag6) }}
        </div>
      </div>
      <div class="register-selected">
        <label for="tag5">ТЕГ (5 баллов)</label>
        <v-select v-model="tag5" :reduce="(option) => option.value" :create-option="tag => ({ label: tag, value: tag })"
          taggable push-tags :options="all_tags" placeholder="Тег (5 баллов)" />
        <div v-if="tag5 == '' && all_validated" class="error">
          {{ toast_danger("Тег (5 баллов)", validation.tag5) }}
        </div>
        <div v-if="youCanAddMoreThanFive" class="error">
          {{ toast_warning("Теги", validation_not_required.tags_count) }}
        </div>
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
        <div v-if="checkDuplicates" class="error">
          {{ toast_warning("Теги", validation_not_required.tags_same) }}
        </div>
      </div>
    </div>
    <div class="register-photo">
      <label for="images">Картинки 1 (JPG, PNG)</label>
      <form enctype="multipart/form-data">
        <my-input v-model="images1" name="file" type="file" accept=".jpg, .png" @input="imagesInput1"></my-input>
      </form>
      <div v-if="images1 == '' && all_validated" class="error">
        {{ toast_danger("Картинки", validation.images1) }}
      </div>
      <div v-if="images1 !== '' && images2 == ''" class="error">
        {{ toast_warning("Картинки", validation_not_required.image_count) }}
      </div>
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

    <div class="validation">
      <div class="validation-item">
        <button class="next_button" @click="addPlace">Добавить заведение</button>
      </div>
    </div>

    <div v-if="succefully_added" class="error">
      {{ toast_success("Вы успешно добавили заведение") }}
    </div>




    <div class="zaglushka"></div>

  </section>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyTextArea from "@/components/UI/MyTextArea.vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { createID } from "@/api/cheeze";
import { postPlace } from "@/api/methods";
import { uploadImage } from "@/api/methods";

import { createToast, clearToasts } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
  name: 'admin',
  setup() {
    return {
      all_tags: [
        { label: "ресторан", value: "ресторан" },
        { label: "кафе", value: "кафе" },
        { label: "бар", value: "бар" },
        { label: "кафейня", value: "кафейня" },
        { label: "кофе", value: "кофе" },
        { label: "живая музыка", value: "живая музыка" },
        { label: "клуб", value: "клуб" },
        { label: "недорого", value: "недорого" },
        { label: "стейк", value: "стейк" },
        { label: "халал", value: "халал" },
        { label: "работаем ночью", value: "работаем ночью" },
        { label: "большие столы", value: "большие столы" },
        { label: "много розеток", value: "много розеток" },
        { label: "бизнес-ланч", value: "бизнес-ланч" },
        { label: "банкет", value: "банкет" },
        { label: "детская комната", value: "детская комната" },
        { label: "детское меню", value: "детское меню" },
        { label: "детская площадка", value: "детская площадка" },
        { label: "итальянская кухня", value: "итальянская кухня" },
        { label: "грузинская кухня", value: "грузинская кухня" },
        { label: "фаст-фуд", value: "фаст-фуд" },
      ],
      validation: {
        "name": "Укажите название заведения",
        "city_name": "Укажите город",
        "TWOgis_url": "Укажите ссылку на 2ГИС",
        "address": "Укажите адрес",
        "phone": "Укажите номер телефона",
        "short_description": "Укажите краткое описание",
        "long_description": "Укажите полное описание",
        "start_work_time": "Укажите время начала работы",
        "end_work_time": "Укажите время окончания работы",
        "category": "Укажите категорию",
        "subcategory": "Укажите подкатегорию",
        "name_length": "Название не может быть длинее 30 символов",
        "short_description_length": "Краткое описание не может быть длинее 30 символов",
        "long_description_length": "Полное описание не может быть длинее 200 символов",
        "address_length": "Адрес не может быть длинее 25 символов",
        "phone_length": "Номер телефона состоит из 11 цифр и начинается с '+7', а также не содержит БУКВ и СИМВОЛОВ",
        "category_length": "Категория не может быть длинее 18 символов",
        "subcategory_length": "Подкатегория не может быть длинее 18 символов",
        "tag_length": "Тег не может быть длинее 15 символов",
        "image_length": "Загрузите минимум 1 фотографию",
        "TWOgis_url_invalid": "Ваша ссылка не ведет на 2ГИС",
        "instagram_link_invalid": "Ваша ссылка не ведет на INSTAGRAM",

      },
      validation_not_required: {
        "instagram_link": "Укажите ссылку на ваш INSTAGRAM, и тогда он появится на странице вашего заведения",
        "whatsapp_link": "Укажите телефон на котором есть whatsapp, и тогда он появится на странице вашего заведения",
        "image_count": "Вы можете загрузить 3 фотографии",
        "tags_count": "Вы можете выбрать/создать 10 тегов, чем больше тегов и чем они узнонаправленее, тем выше шанс попасть в рекомендации",
        "work_time": "Ваше время работы явно ошибочное",
        "image_same": "Вы загрузили одинаковые фотографии",
        "tags_same": "Выбор одинаковых тегов не имеет смысла",
      },
      toast_danger: function (title, description) {
        createToast({
          title: title,
          description: description
        }, {
          type: 'danger', // 'info', 'danger', 'warning', 'success', 'default'
          timeout: 5000,
          showCloseButton: true,
          position: 'top-center', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
          transition: 'bounce',
          hideProgressBar: false,
          swipeClose: true,
          onClose: null,
          showIcon: true
        })
      },
      toast_success: function (title, description) {
        createToast({
          title: title,
          description: description
        }, {
          type: 'success', // 'info', 'danger', 'warning', 'success', 'default'
          timeout: 10000,
          showCloseButton: true,
          position: 'top-center', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
          transition: 'bounce',
          hideProgressBar: false,
          swipeClose: true,
          onClose: null,
          showIcon: true
        })
      },
      toast_warning: function (title, description) {
        createToast({
          title: title,
          description: description
        }, {
          type: 'info', // 'info', 'danger', 'warning', 'success', 'default'
          timeout: 5000,
          showCloseButton: true,
          position: 'top-center', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
          transition: 'bounce',
          hideProgressBar: false,
          swipeClose: true,
          onClose: null,
          showIcon: true
        })
      },
      areAllTrue(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (!obj[key]) {
              return false;
            }
          }
        }
        return true;
      },
      replaceKeysWithFalse(obj) {
        var newObj = {};
        for (var key in obj) {
          newObj[key] = false;
        }
        return newObj;
      },
      clearAllInputsData() {
        this.name = "";
        this.city_name = "";
        this.TWOgis_url = "";
        this.address = "";
        this.instagram_link = "";
        this.phone = "+7";
        this.category = "";
        this.subcategory = "";
        this.short_description = "";
        this.long_description = "";
        this.start_work_time = "";
        this.end_work_time = "";
        this.images1 = "";
        this.images2 = "";
        this.images3 = "";
        this.tag10 = "";
        this.tag9 = "";
        this.tag8 = "";
        this.tag7 = "";
        this.tag6 = "";
        this.tag5 = "";
        this.tag4 = "";
        this.tag3 = "";
        this.tag2 = "";
        this.tag1 = "";
      },
    }
  },
  components: {
    MyInput,
    MyButton,
    vSelect,
    MyTextArea,
  },
  methods: {
    NameInput(event) {
      this.name = event.target.value;
      if (this.name.length < 30) {
        this.validation_options.name_valid = true;
      }
      else {
        this.validation_options.name_valid = false;
        clearToasts();
      }

    },
    cityInput(event) {
      this.city_name = event.target.value;
      this.validation_options.city_name_valid = true;
    },
    TWOgisInput(event) {
      this.TWOgis_url = event.target.value;
      if (this.TWOgis_url.includes('2gis.kz')) {
        this.validation_options.TWOgis_url_valid = true;
      }
      else {
        this.validation_options.TWOgis_url_valid = false;
        clearToasts();
      }
    },
    addressInput(event) {
      this.address = event.target.value;
      if (this.address.length < 25) {
        this.validation_options.address_valid = true;
      }
      else {
        this.validation_options.address_valid = false;
        clearToasts();
      }

    },
    phoneInput(event) {
      if (Number(event.target.value.slice(1, -1)) || event.target.value == '+7') {
        this.phone = event.target.value;

        if (this.phone.length === 12) {
          this.validation_options.phone_valid = true;
        }
        else if (this.phone.length < 13) {
          // ssory for this
          // but it's like true but not true
          this.validation_options.phone_valid = "krivalex";
        }
        else {
          this.validation_options.phone_valid = false;
          clearToasts();
        }
      }
      else {
        this.validation_options.phone_valid = false;
      }


    },
    categoryInput(event) {
      this.category = event.target.value;
      if (this.category.length < 18) {
        this.validation_options.category_valid = true;
      }
      else {
        this.validation_options.category_valid = false;
        clearToasts();
      }
    },
    subcategoryInput(event) {
      this.subcategory = event.target.value;
      if (this.subcategory.length < 18) {
        this.validation_options.subcategory_valid = true;
      }
      else {
        this.validation_options.subcategory_valid = false;
        clearToasts();
      }
    },
    instagramInput(event) {
      this.instagram_link = event.target.value;
      if (this.instagram_link.length > 0 && this.instagram_link.includes('instagram.com')) {
        this.validation_options.instagram_link_valid = true;
      }
      else {
        this.validation_options.instagram_link_valid = false;
        clearToasts();
      }
    },
    shortDescriptionInput(event) {
      this.short_description = event.target.value;
      if (this.short_description.length < 30) {
        this.validation_options.short_description_valid = true;
      }
      else {
        this.validation_options.short_description_valid = false;
        clearToasts();
      }
    },
    longDescriptionInput(event) {
      this.long_description = event.target.value;
      if (this.long_description.length < 200) {
        this.validation_options.long_description_valid = true;
      }
      else {
        this.validation_options.long_description_valid = false;
        clearToasts();
      }
    },
    startWorkTimeInput(event) {
      this.start_work_time = event.target.value;
      this.validation_options.start_work_time_valid = true;
    },
    endWorkTimeInput(event) {
      this.end_work_time = event.target.value;
      this.validation_options.end_work_time_valid = true;
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
          this.validation_options.images1_valid = true;
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
        };
      }
    },

    addPlace() {
      const id = createID();
      this.all_validated = true;
      if (this.areAllTrue(this.validation_options)) {
        this.all_validated = "krivalex";
      }

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
      if (this.all_validated === "krivalex") {
        postPlace(data).then((response) => {
          console.log(response);
          let image_pack = {
            place_id: id,
            file: this.images1,
          }

          this.all_validated = false;
          this.replaceKeysWithFalse(this.validation_options)
          this.succefully_added = true;
          this.clearAllInputsData();

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
    }
  },
  data() {
    return {
      name: "",
      city_name: "",
      TWOgis_url: "",
      address: "",
      instagram_link: "",
      phone: "+7",
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
      all_validated: false,
      succefully_added: false,
      once: true,

      validation_options: {
        name_valid: false,
        city_name_valid: false,
        TWOgis_url_valid: false,
        address_valid: false,
        instagram_link_valid: true,
        phone_valid: false,
        category_valid: false,
        subcategory_valid: false,
        short_description_valid: false,
        long_description_valid: false,
        start_work_time_valid: false,
        end_work_time_valid: false,
        images1_valid: false,
        images2_valid: true,
        images3_valid: true,
        tag10_valid: true,
        tag9_valid: true,
        tag8_valid: true,
        tag7_valid: true,
        tag6_valid: true,
        tag5_valid: true,
        tag4_valid: true,
        tag3_valid: true,
        tag2_valid: true,
        tag1_valid: true,
      }
    }
  },
  computed: {
    checkDuplicates() {
      const all_tags = [this.tag10, this.tag9, this.tag8, this.tag7, this.tag6, this.tag5, this.tag4, this.tag3, this.tag2, this.tag1]

      let duplicates = false;
      for (let i = 0; i < all_tags.length; i++) {
        for (let j = 0; j < all_tags.length; j++) {
          if (all_tags[i] == all_tags[j] && i != j && all_tags[i] !== "") {
            duplicates = true;
          }
        }
      }
      return duplicates;
    },
    youCanAddMoreThanFive() {
      const all_tags = [this.tag10, this.tag9, this.tag8, this.tag7, this.tag6, this.tag5, this.tag4, this.tag3, this.tag2, this.tag1]
      let counter = 0;
      for (let i = 0; i < all_tags.length; i++) {
        if (all_tags[i] !== "") {
          counter++;
        }
      }
      if (counter === 5) {
        clearToasts();
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style scoped>
#admin {
  background-color: var(--main-haki-color);
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

