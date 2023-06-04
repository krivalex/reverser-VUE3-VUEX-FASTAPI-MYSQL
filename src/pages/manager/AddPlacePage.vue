<template>
  <section id="admin">

    <div class="register-label">
      <h1>Добавить заведение</h1>
    </div>


    <div class="inputs">

      <div class="register-label-small">
        <h1>Ключевая информация</h1>
        <div class="register-label-small-line"></div>
      </div>

      <div class="register-item">
        <label for="name">Название заведения (MAX: 30 символов)</label>

        <div class="register-input">
          <my-input v-model="name" name="name" placeholder="Название заведения" @input="nameInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('name')"></i>
          <i v-if="validation_options.name_valid" class="green fa fa-check" @click="checkValue('name')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('name')"></i>
        </div>

        <div v-if="name == '' && all_validated" class="error">
          {{ toast_danger("Название", validation.name) }}
        </div>
      </div>

      <div class="register-item">
        <label for="city_name">Город</label>


        <div class="register-input">
          <my-input v-model.lazy="city_name" name="city_name" placeholder="Город" @input="cityInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('city_name')"></i>
          <i v-if="validation_options.city_name_valid" class="green fa fa-check" @click="checkValue('city_name')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('city_name')"></i>
        </div>

        <div v-if="city_name == '' && all_validated" class="error">
          {{ toast_danger("Город", validation.city_name) }}
        </div>
      </div>

      <div class="register-item">
        <label for="address">Адрес Улицы (MAX: 25 символов)</label>

        <div class="register-input">
          <my-input v-model.lazy="address" name="address" placeholder="Адрес" @input="addressInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('address')"></i>
          <i v-if="validation_options.address_valid" class="green fa fa-check" @click="checkValue('address')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('address')"></i>
        </div>

        <div v-if="address == '' && all_validated" class="error">
          {{ toast_danger("Адрес", validation.address) }}
        </div>
        <div v-else-if="address.length > 25 && !validation_options.address_valid" class="error">
          {{ toast_danger("Адрес", validation.address_length) }}
        </div>
      </div>

      <div class="register-item">
        <label for="short_description">Короткое описание (MAX: 30 символов)</label>

        <div class="register-input">
          <my-input v-model.lazy="short_description" name="short_description" placeholder="Короткое описание"
            @input="shortDescriptionInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('short_description')"></i>
          <i v-if="validation_options.short_description_valid" class="green fa fa-check"
            @click="checkValue('short_description')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('short_description')"></i>
        </div>

        <div v-if="short_description == '' && all_validated" class="error">
          {{ toast_danger("Короткое описание", validation.short_description) }}
        </div>
        <div v-else-if="short_description.length > 30 && !validation_options.short_description_valid" class="error">
          {{ toast_danger("Короткое описание", validation.short_description_length) }}
        </div>
      </div>

      <div class="register-item">
        <label for="long_description">Длинное описание (MAX: 200 символов)</label>

        <div class="long register-input">
          <my-text-area v-model.lazy="long_description" name="long_description" placeholder="Длинное описание"
            @input="longDescriptionInput"></my-text-area>

          <i class="fa fa-trash" @click="deleteValue('long_description')"></i>
          <i v-if="validation_options.long_description_valid" class="green fa fa-check"
            @click="checkValue('long_description')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('long_description')"></i>
        </div>

        <div v-if="long_description == '' && all_validated" class="error">
          {{ toast_danger("Длинное описание", validation.long_description) }}
        </div>
        <div v-else-if="long_description.length > 200 && !validation_options.long_description_valid" class="error">
          {{ toast_danger("Длинное описание", validation.long_description_length) }}
        </div>
      </div>

      <div class="register-item">
        <label for="category">Категория (MAX: 18 символов)</label>

        <div class="register-input">
          <my-input v-model.lazy="category" name="category" placeholder="Категория" @input="categoryInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('category')"></i>
          <i v-if="validation_options.category_valid" class="green fa fa-check" @click="checkValue('category')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('category')"></i>
        </div>

        <div v-if="category == '' && all_validated" class="error">
          {{ toast_danger("Категория", validation.category) }}
        </div>
        <div v-else-if="category.length > 18 && !validation_options.category_valid" class="error">
          {{ toast_danger("Категория", validation.category_length) }}
        </div>
      </div>

      <div class="register-item">
        <label for="subcategory">Подкатегория (MAX: 18 символов)</label>

        <div class="register-input">
          <my-input v-model.lazy="subcategory" name="subcategory" placeholder="Подкатегория"
            @input="subcategoryInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('subcategory')"></i>
          <i v-if="validation_options.subcategory_valid" class="green fa fa-check" @click="checkValue('subcategory')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('subcategory')"></i>
        </div>

        <div v-if="subcategory == '' && all_validated" class="error">
          {{ toast_danger("Подкатегория", validation.subcategory) }}
        </div>
        <div v-else-if="subcategory.length > 18 && !validation_options.subcategory_valid" class="error">
          {{ toast_danger("Подкатегория", validation.subcategory_length) }}
        </div>
      </div>

      <div class="time register-item">
        <label for="start-work-time">Начало работы (00:00)</label>

        <div class="register-input">
          <my-input type="time" v-model.lazy="start_work_time" name="start-work-time" placeholder="Время открытия"
            @input.once="startWorkTimeInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('start_work_time')"></i>
          <i v-if="validation_options.start_work_time_valid" class="fa fa-check"
            @click="checkValue('start_work_time')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('start_work_time')"></i>
        </div>

        <div v-if="start_work_time == '' && all_validated" class="error">
          {{ toast_danger("Начало работы", validation.start_work_time) }}
        </div>
      </div>

      <div class="register-item">
        <label for="end-work-time">Конец работы (00:00)</label>

        <div class="time register-input">
          <my-input type="time" v-model.lazy="end_work_time" name="end-work-time" placeholder="Время закрытия"
            @input.once="endWorkTimeInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('end_work_time')"></i>
          <i v-if="validation_options.end_work_time_valid" class="green fa fa-check"
            @click="checkValue('end_work_time')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('end_work_time')"></i>
        </div>

        <div v-if="end_work_time == '' && all_validated" class="error">
          {{ toast_danger("Конец работы", validation.end_work_time) }}
        </div>
      </div>

      <div class="register-label-small">
        <h1>Ссылки</h1>
        <div class="register-label-small-line"></div>
      </div>

      <div class="register-item">
        <label for="TWOgis_url">2ГИС (Ссылка)</label>

        <div class="register-input">
          <my-input type="url" v-model="TWOgis_url" name="TWOgis_url" placeholder="2ГИС" @input="TWOgisInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('TWOgis_url')"></i>
          <i v-if="validation_options.TWOgis_url_valid" class="green fa fa-check" @click="checkValue('TWOgis_url')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('TWOgis_url')"></i>
        </div>

        <div v-if="TWOgis_url == '' && all_validated" class="error">
          {{ toast_danger("Cсылка на 2ГИС", validation.TWOgis_url) }}
        </div>
        <div v-else-if="TWOgis_url.length > 0 && !TWOgis_url.includes('2gis.kz')" class="error">
          {{ toast_danger("Cсылка на 2ГИС", validation.TWOgis_url_invalid) }}
        </div>
      </div>

      <div class="register-item">
        <label for="phone">Whatsapp для клиентов (Номер)</label>

        <div class="register-input">
          <my-input type="tel" placeholder="Whatsapp для клиентов" v-model.lazy="phone" name="phone"
            @input="phoneInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('phone')"></i>
          <i v-if="validation_options.phone_valid" class="green fa fa-check" @click="checkValue('phone')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('phone')"></i>
        </div>

        <div v-if="phone == '+7' && all_validated" class="error">
          {{ toast_danger("Номер телефона", validation.phone) }}
        </div>
      </div>

      <div class="register-item">
        <label for="instagram_link">Instagram (Ссылка)</label>

        <div class="register-input">
          <my-input v-model.lazy="instagram_link" name="instagram_link" placeholder="Instagram"
            @input="instagramInput"></my-input>

          <i class="fa fa-trash" @click="deleteValue('instagram_link')"></i>
          <i v-if="validation_options.instagram_link_valid" class="green fa fa-check"
            @click="checkValue('instagram_link')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('instagram_link')"></i>
        </div>

        <div v-if="instagram_link.length > 0 && !instagram_link.includes('instagram.com')" class="error">
          {{ toast_danger("Ссылка на Instagram", validation.instagram_link_invalid) }}
        </div>
      </div>



      <div class="register-label-small">
        <h1>Теги</h1>
        <div class="register-label-small-line"></div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag10_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (10 баллов)" />

        <i v-if="validation_options.tag10_valid" class="green fa fa-check" @click="checkValue('tag10', tag10)"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag10')"></i>

        <div v-if="tag10 == '' && all_validated" class="error">
          {{ toast_danger("Тег (10 баллов)", validation.tag10) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag9_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (9 баллов)" />

        <i v-if="validation_options.tag9_valid" class="green fa fa-check" @click="checkValue('tag9')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag9')"></i>

        <div v-if="tag9 == '' && all_validated" class="error">
          {{ toast_danger("Тег (9 баллов)", validation.tag9) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag8_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (8 баллов)" />

        <i v-if="validation_options.tag8_valid" class="green fa fa-check" @click="checkValue('tag8')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag8')"></i>

        <div v-if="tag8 == '' && all_validated" class="error">
          {{ toast_danger("Тег (8 баллов)", validation.tag8) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag7_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (7 баллов)" />

        <i v-if="validation_options.tag7_valid" class="green fa fa-check" @click="checkValue('tag7')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag7')"></i>

        <div v-if="tag7 == '' && all_validated" class="error">
          {{ toast_danger("Тег (7 баллов)", validation.tag7) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag6_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (6 баллов)" />

        <i v-if="validation_options.tag6_valid" class="green fa fa-check" @click="checkValue('tag6')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag6')"></i>

        <div v-if="tag6 == '' && all_validated" class="error">
          {{ toast_danger("Тег (6 баллов)", validation.tag6) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag5_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (5 баллов)" />

        <i v-if="validation_options.tag5_valid" class="green fa fa-check" @click="checkValue('tag5')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag5')"></i>

        <div v-if="tag5 == '' && all_validated" class="error">
          {{ toast_danger("Тег (5 баллов)", validation.tag5) }}
        </div>
        <div v-if="youCanAddMoreThanFive" class="error">
          {{ toast_warning("Теги", validation_not_required.tags_count) }}
        </div>
      </div>

      <div class="register-selected">

        <v-select v-model="tag4_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (4 баллов)" />

        <i v-if="validation_options.tag4_valid" class="green fa fa-check" @click="checkValue('tag4')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag4')"></i>

      </div>

      <div class="register-selected">

        <v-select v-model="tag3_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (3 баллов)" />

        <i v-if="validation_options.tag3_valid" class="green fa fa-check" @click="checkValue('tag3')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag3')"></i>

      </div>
      <div class="register-selected">

        <v-select v-model="tag2_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (2 баллов)" />

        <i v-if="validation_options.tag2_valid" class="green fa fa-check" @click="checkValue('tag2')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag2')"></i>

      </div>

      <div class="register-selected">

        <v-select v-model="tag1_valid" :reduce="(option) => option.value"
          :create-option="tag => ({ label: tag, value: tag })" taggable push-tags :options="all_tags"
          placeholder="Тег (1 баллов)" />

        <i v-if="validation_options.tag1_valid" class="green fa fa-check" @click="checkValue('tag1')"></i>
        <i v-else class="red fa fa-times" @click="checkValue('tag1')"></i>

        <div v-if="checkDuplicates" class="error">
          {{ toast_warning("Теги", validation_not_required.tags_same) }}
        </div>
      </div>

      <div class="register-label-small">
        <h1>Изображения</h1>
        <div class="register-label-small-line"></div>
      </div>

      <div class="register-photo">
        <label for="images">Картинка 1 (JPG, PNG)</label>

        <form class="image-validator" enctype="multipart/form-data">
          <my-input name="file" type="file" accept=".jpg, .png" @input="imagesInput1"></my-input>

          <i class="fa fa-trash" @click="deleteValue('images1')"></i>
          <i v-if="validation_options.images1_valid" class="green fa fa-check" @click="checkValue('images1')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('images1')"></i>

        </form>

        <div v-if="images1 == '' && all_validated" class="error">
          {{ toast_danger("Картинки", validation.images1) }}
        </div>
        <div v-if="images1 !== '' && images2 == ''" class="error">
          {{ toast_warning("Картинки", validation_not_required.image_count) }}
        </div>
      </div>

      <div class="register-photo">
        <label for="images">Картинка 2 (JPG, PNG)</label>

        <form class="image-validator" enctype="multipart/form-data">
          <my-input name="file" type="file" accept=".jpg, .png" @input="imagesInput2"></my-input>

          <i class="fa fa-trash" @click="deleteValue('images2')"></i>
          <i v-if="validation_options.images2_valid" class="green fa fa-check" @click="checkValue('images2')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('images2')"></i>

        </form>

      </div>

      <div class="register-photo">
        <label for="images">Картинка 3 (JPG, PNG)</label>

        <form class="image-validator" enctype="multipart/form-data">
          <my-input name="file" type="file" accept=".jpg, .png" @input="imagesInput3"></my-input>

          <i class="fa fa-trash" @click="deleteValue('images3')"></i>
          <i v-if="validation_options.images3_valid" class="green fa fa-check" @click="checkValue('images3')"></i>
          <i v-else class="red fa fa-times" @click="checkValue('images3')"></i>
        </form>

      </div>

    </div>



    <div class="validation">
      <div class="validation-item">
        <button class="next_button" @click="addPlace">Добавить заведение</button>
      </div>
    </div>

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
  name: 'add-place-page',
  setup() {
    return {
      all_tags: [
        { label: "ресторан", value: "ресторан" },
        { label: "кафе", value: "кафе" },
        { label: "бар", value: "бар" },
        { label: "кофейня", value: "кофейня" },
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
        "name_length": "Название не может быть длинее 30 символов, и короче 5",
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
          timeout: 3000,
          showCloseButton: true,
          position: 'top-center', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
          transition: 'slide',
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
      toast_success_fast: function (title, description) {
        createToast({
          title: title,
          description: description
        }, {
          type: 'success', // 'info', 'danger', 'warning', 'success', 'default'
          timeout: 2000,
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
        localStorage.clear();
        localStorage.setItem('user_id', this.$store.state.user_id);
      },
      validateValue(value) {
        value = value.trim();
        value = value.replace(/\s+/g, ' ');
        value = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
        return value;
      }
    }
  },
  components: {
    MyInput,
    MyButton,
    vSelect,
    MyTextArea,
  },
  methods: {
    deleteValue(property) {
      if (this.$data.hasOwnProperty(property)) {
        this[property] = '';
      }
    },
    checkValue(property) {
      const valid_property = property + '_valid';
      if (this.$data.validation_options.hasOwnProperty(valid_property)) {
        if (this.validation_options[valid_property] === true) {
          this.toast_success_fast('Успешно', 'Ваше поле ' + property + ' заполнено верно');
        }
        else {
          this.toast_danger('Неправильно', 'Ваше поле ' + property + ' заполнено неверно');
        }
      }
    },
    nameInput(event) {
      clearToasts();
      this.name = event.target.value;
      this.name = this.validateValue(this.name);


      if (this.name.length < 5) {
        this.validation_options.name_valid = false;
      }
      else if (this.name.length < 30) {
        this.validation_options.name_valid = true;
        localStorage.setItem('name', this.name);
      }
      else {
        this.validation_options.name_valid = false;
        this.toast_danger('Название', this.validation.name_length);
      }

    },
    cityInput(event) {
      clearToasts();
      this.city_name = event.target.value;
      this.city_name = this.validateValue(this.city_name);

      if (this.city_name.length < 3) {
        this.validation_options.city_name_valid = false;
      }
      else {
        this.validation_options.city_name_valid = true;
        localStorage.setItem('city_name', this.city_name);
      }
    },
    TWOgisInput(event) {
      clearToasts();
      this.TWOgis_url = event.target.value;

      if (this.TWOgis_url.includes('2gis.kz')) {
        this.validation_options.TWOgis_url_valid = true;
        localStorage.setItem('TWOgis_url', this.TWOgis_url);
      }
      else {
        this.validation_options.TWOgis_url_valid = false;
      }
    },
    addressInput(event) {
      clearToasts();
      this.address = event.target.value;
      this.address = this.validateValue(this.address);

      if (this.address.length < 5) {
        this.validation_options.address_valid = false;
      }
      else if (this.address.length < 25) {
        this.validation_options.address_valid = true;
        localStorage.setItem('address', this.address);
      }
      else {
        this.validation_options.address_valid = false;
      }

    },
    phoneInput(event) {
      clearToasts();
      if (Number(event.target.value.slice(1, -1)) || event.target.value === '+7') {
        this.phone = event.target.value;

        if (this.phone.length === 12) {
          this.validation_options.phone_valid = true;
          localStorage.setItem('phone', this.phone);
        }
        else if (this.phone.length < 12) {
          // ssory for this
          // but it's like true but not true
          this.validation_options.phone_valid = false;
        }
        else {
          this.validation_options.phone_valid = false;
          this.toast_danger('Номер телефона', this.validation.phone_length);
        }
      }
      else {
        this.validation_options.phone_valid = false;
        this.toast_danger('Номер телефона', this.validation.phone_length);
      }


    },
    categoryInput(event) {
      clearToasts();
      this.category = event.target.value;
      this.category = this.validateValue(this.category);

      if (this.category.length < 3) {
        this.validation_options.category_valid = false;
      }
      else if (this.category.length < 18) {
        this.validation_options.category_valid = true;
        localStorage.setItem('category', this.category);
      }
      else {
        this.validation_options.category_valid = false;
      }
    },
    subcategoryInput(event) {
      clearToasts();
      this.subcategory = event.target.value;
      this.subcategory = this.validateValue(this.subcategory);

      if (this.subcategory.length < 3) {
        this.validation_options.subcategory_valid = false;
      }
      else if (this.subcategory.length < 18) {
        this.validation_options.subcategory_valid = true;
        localStorage.setItem('subcategory', this.subcategory);
      }
      else {
        this.validation_options.subcategory_valid = false;
      }
    },
    instagramInput(event) {
      clearToasts();
      this.instagram_link = event.target.value;

      if (this.instagram_link.length > 0 && this.instagram_link.includes('instagram.com')) {
        this.validation_options.instagram_link_valid = true;
        localStorage.setItem('instagram_link', this.instagram_link);
      }
      else if (this.instagram_link.length === 0) {
        this.validation_options.instagram_link_valid = true;
      }
      else {
        this.validation_options.instagram_link_valid = false;
      }
    },
    shortDescriptionInput(event) {
      clearToasts();
      this.short_description = event.target.value;
      this.shortDescription = this.validateValue(this.short_description);

      if (this.short_description.length < 10) {
        this.validation_options.short_description_valid = false;
      }
      else if (this.short_description.length < 30) {
        this.validation_options.short_description_valid = true;
        localStorage.setItem('short_description', this.short_description);
      }
      else {
        this.validation_options.short_description_valid = false;
      }
    },
    longDescriptionInput(event) {
      clearToasts();
      this.long_description = event.target.value;
      this.long_description = this.validateValue(this.long_description);

      if (this.long_description.length < 50) {
        this.validation_options.long_description_valid = false;
      }
      else if (this.long_description.length < 200) {
        this.validation_options.long_description_valid = true;
        localStorage.setItem('long_description', this.long_description);
      }
      else {
        this.validation_options.long_description_valid = false;
      }
    },
    startWorkTimeInput(event) {
      clearToasts();
      this.start_work_time = event.target.value;

      this.validation_options.start_work_time_valid = true;
      localStorage.setItem('start_work_time', this.start_work_time);
    },
    endWorkTimeInput(event) {
      clearToasts();
      this.end_work_time = event.target.value;

      this.validation_options.end_work_time_valid = true;
      localStorage.setItem('end_work_time', this.end_work_time);
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
          const image_pack1 = {
            place_id: id,
            file: this.images1,
          }

          const image_pack2 = {
            place_id: id,
            file: this.images2,
          }

          const image_pack3 = {
            place_id: id,
            file: this.images3,
          }

          uploadImage(image_pack1).then((response) => {
            console.log(response);
            uploadImage(image_pack2).then((response) => {
              console.log(response);
              uploadImage(image_pack3).then((response) => {
                console.log(response);
              });
            });
          });

          this.all_validated = false;
          this.replaceKeysWithFalse(this.validation_options)
          this.succefully_added = true;
          this.clearAllInputsData();
        });
      }
    }
  },
  data() {
    return {
      name: localStorage.getItem('name') || "",
      city_name: localStorage.getItem('city_name') || "",
      TWOgis_url: localStorage.getItem('TWOgis_url') || "",
      address: localStorage.getItem('address') || "",
      instagram_link: localStorage.getItem('instagram_link') || "",
      phone: localStorage.getItem('phone') || "+7",
      category: localStorage.getItem('category') || "",
      subcategory: localStorage.getItem('subcategory') || "",
      short_description: localStorage.getItem('short_description') || "",
      long_description: localStorage.getItem('long_description') || "",
      start_work_time: localStorage.getItem('start_work_time') || "",
      end_work_time: localStorage.getItem('end_work_time') || "",
      images1: "",
      images2: "",
      images3: "",
      tag10: localStorage.getItem('tag10') || "",
      tag9: localStorage.getItem('tag9') || "",
      tag8: localStorage.getItem('tag8') || "",
      tag7: localStorage.getItem('tag7') || "",
      tag6: localStorage.getItem('tag6') || "",
      tag5: localStorage.getItem('tag5') || "",
      tag4: localStorage.getItem('tag4') || "",
      tag3: localStorage.getItem('tag3') || "",
      tag2: localStorage.getItem('tag2') || "",
      tag1: localStorage.getItem('tag1') || "",
      all_validated: false,
      succefully_added: false,

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
        tag10_valid: false,
        tag9_valid: false,
        tag8_valid: false,
        tag7_valid: false,
        tag6_valid: false,
        tag5_valid: false,
        tag4_valid: false,
        tag3_valid: false,
        tag2_valid: false,
        tag1_valid: false,
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
    tag10_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag10_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag10_valid = false;
        }
        else {
          this.validation_options.tag10_valid = true;
          localStorage.setItem('tag10', value);
        }
        this.tag10 = value;
      },
      get() {
        return this.tag10;
      }
    },
    tag9_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag9_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag9_valid = false;
        }
        else {
          this.validation_options.tag9_valid = true;
          localStorage.setItem('tag9', value);
        }
        this.tag9 = value;
      },
      get() {
        return this.tag9;
      }
    },
    tag8_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag8_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag8_valid = false;
        }
        else {
          this.validation_options.tag8_valid = true;
          localStorage.setItem('tag8', value);
        }
        this.tag8 = value;
      },
      get() {
        return this.tag8;
      }
    },
    tag7_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag7_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag7_valid = false;
        }
        else {
          this.validation_options.tag7_valid = true;
          localStorage.setItem('tag7', value);
        }
        this.tag7 = value;
      },
      get() {
        return this.tag7;
      }
    },
    tag6_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag6_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag6_valid = false;
        }
        else {
          this.validation_options.tag6_valid = true;
          localStorage.setItem('tag6', value);
        }
        this.tag6 = value;
      },
      get() {
        return this.tag6;
      }
    },
    tag5_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag5_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag5_valid = false;
        }
        else {
          this.validation_options.tag5_valid = true;
          localStorage.setItem('tag5', value);
        }
        this.tag5 = value;
      },
      get() {
        return this.tag5;
      }
    },
    tag4_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag4_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag4_valid = false;
        }
        else {
          this.validation_options.tag4_valid = true;
          localStorage.setItem('tag4', value);
        }
        this.tag4 = value;
      },
      get() {
        return this.tag4;
      }
    },
    tag3_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag3_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag3_valid = false;
        }
        else {
          this.validation_options.tag3_valid = true;
          localStorage.setItem('tag3', value);
        }
        this.tag3 = value;
      },
      get() {
        return this.tag3;
      }
    },
    tag2_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag2_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag2_valid = false;
        }
        else {
          this.validation_options.tag2_valid = true;
          localStorage.setItem('tag2', value);
        }
        this.tag2 = value;
      },
      get() {
        return this.tag2;
      }
    },
    tag1_valid: {
      set(value) {
        if (value.length > 17) {
          this.validation_options.tag1_valid = false;
        } else if (value.length < 3) {
          this.validation_options.tag1_valid = false;
        }
        else {
          this.validation_options.tag1_valid = true;
          localStorage.setItem('tag1', value);
        }
        this.tag1 = value;
      },
      get() {
        return this.tag1;
      }
    },
  },
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

.register-label-small {
  font-size: 15px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px 20px;
}

.register-label-small-line {
  width: 90%;
  height: 1px;
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 20px;
}

.register-label {
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 100px;
  background-color: black;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
}

.register-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 15px;
}

.register-input {
  position: relative;
  width: 100%;
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
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0;

}

.register-item label {
  font-size: 18px;
  max-width: 100%;
  color: lightgray;
  margin-bottom: 7px;
}



.register-input .fa-trash {
  position: absolute;
  right: 3%;
  top: 25%;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-input .fa-trash:hover {
  color: #D9C5C9;
}

.register-input .fa-check {
  position: absolute;
  right: 8%;
  top: 25%;
  color: #008000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-input .fa-check:hover {
  color: #D9C5C9;
}

.register-input .fa-times {
  position: absolute;
  right: 8%;
  top: 25%;
  color: #DC143C;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-input .fa-times:hover {
  color: #D9C5C9;
}

.time .fa-trash {
  position: absolute;
  right: 11%;
  top: 23%;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.time .fa-check {
  position: absolute;
  right: 16.5%;
  top: 23%;
  color: #008000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.time .fa-times {
  position: absolute;
  right: 16.5%;
  top: 23%;
  color: #DC143C;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.long .fa-trash {
  position: absolute;
  right: 6%;
  top: 80%;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.long .fa-check {
  position: absolute;
  right: 11%;
  top: 80%;
  color: #008000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.long .fa-times {
  position: absolute;
  right: 11%;
  top: 80%;
  color: #DC143C;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.image-validator {
  position: relative;
}

.image-validator .fa-check {
  position: absolute;
  right: -2%;
  top: 26%;
  color: #008000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.image-validator .fa-times {
  position: absolute;
  right: -2%;
  top: 26%;
  color: #DC143C;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.image-validator .fa-trash {
  position: absolute;
  right: -8%;
  top: 26%;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-input input {
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

.register-input textarea {
  max-width: 100%;
  height: 200px;
  border: none;
  border-radius: 30px;
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

.inputs {
  width: 100vw;
}

.register-selected {
  background-color: #ffffff;
  border-radius: 50px;
  font-size: 15px;
  max-width: 90%;
  margin: 0 auto;
  position: relative;
  margin-bottom: 10px;
}

.register-selected label {
  font-size: 20px;
  max-width: 90%;
  color: lightgray;
  margin-bottom: 7px;
}

.register-selected .fa-check {
  position: absolute;
  right: 12%;
  top: 20%;
  color: #008000;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-selected .fa-check:hover {
  color: #D9C5C9;
}

.register-selected .fa-times {
  position: absolute;
  right: 12%;
  top: 20%;
  color: #DC143C;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-selected .fa-times:hover {
  color: #D9C5C9;
}

.register-selected {
  --vs-controls-color: black;

  --vs-dropdown-bg: #ffffff;
  --vs-dropdown-color: white;
  --vs-dropdown-option-color: var(--main-haki-color);

  --vs-selected-bg: #000000;
  --vs-selected-color: #000000;

  --vs-search-input-color: gray;

  --vs-dropdown-option--active-bg: #ffffff;
  --vs-dropdown-option--active-color: #DC143C;

  border: 1px solid #000000;
}

#photo-input {
  display: flex;
  justify-content: center;
  align-items: center;
}


.next_button {
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: black;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  margin-top: 20px;
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

