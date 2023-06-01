<template>
  <my-modal v-model:show="model" @:update:model="showModel">
    <div class="add_reviews">
      <img class="close-button" src="@/assets/close.png" @click="showModel" alt="close" />

      <div class="reviews">

        <div class="reviews_text">
          <h1 class="review-label">Ваш логин:</h1>
          <h1 class="review-desc"><strong>{{ user_login }}</strong></h1>
          <edit-data-input v-model:edit_var="new_login" :edit_var="new_login"
            @:update:edit_var="this.$emit('update:edit_var', new_login)"></edit-data-input>
          <div v-if="new_login.length > 15" class="error">
            {{ toast_danger("Логин", "Логин не может быть длинее 15 символов") }}
          </div>
        </div>

        <div class="reviews_text">
          <h1 class="review-label">Ваш email:</h1>
          <h1 class="review-desc"><strong>{{ user_email }}</strong></h1>
          <edit-data-input v-model:edit_var="new_email" :edit_var="new_email"
            @:update:edit_var="this.$emit('update:edit_var', new_email)"></edit-data-input>
          <div v-if="!new_email.includes('@') || !new_email.includes('.')" class="error">
            {{ toast_warning("Почта", "Возможно ваша почта неверная") }}
          </div>
        </div>

        <div class="reviews_text">
          <h1 class="review-label">Ваш телефон:</h1>
          <h1 class="review-desc"><strong>{{ user_phone }}</strong></h1>
          <edit-data-input v-model:edit_var="new_phone" :edit_var="new_phone"
            @:update:edit_var="this.$emit('update:edit_var', new_phone)"></edit-data-input>
          <div v-if="new_phone.length !== 12" class="error">
            {{ toast_warning("Почта", "Возможно ваш телефон неверный") }}
          </div>
        </div>


        <div class="reviews_text">
          <h1 class="review-label">Загрузить аватар:</h1>
        </div>

        <form class="input__wrapper" enctype="multipart/form-data">
          <my-input v-model="avatar_new" id="input__file" class="input input__file" name="images" type="file"
            accept=".jpg, .png" @input="imagesInput"></my-input>
          <label for="input__file" class="input__file-button">
            <span class="input__file-icon-wrapper">
              <img class="input__file-icon" src="@/assets/camera-icon.svg" alt="Выбрать файл" width="25">
            </span>
            <span class="input__file-button-text">Выберите файл</span>
          </label>
        </form>

        <div class="add_action">
          <button @click="saveFullEdit" class="skip_button">Обновить профиль</button>
        </div>

      </div>

    </div>

  </my-modal>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyTextArea from "@/components/UI/MyTextArea.vue";
import MyModal from "@/components/UI/MyModal.vue";
import EditDataInput from "./EditDataInput.vue";

import { createToast, clearToasts } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
  name: "edit-client-modal",
  components: {
    MyInput,
    MyTextArea,
    MyModal,
    EditDataInput,
  },
  emits: ['update:model', 'update:edit_var'],
  props: {
    user: {
      type: Object,
      required: true
    },
    model: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  setup() {
    return {
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
    }
  },
  data() {
    return {
      avatar_new: null,
      new_login: this.user.login,
      new_email: this.user.email,
      new_phone: this.user.phone,
    }
  },
  methods: {
    new_email_valid_func() {
      if (this.new_email.includes("@") && this.new_email.includes(".")) {
        this.new_email_valid = true;
      } else {
        this.new_email_valid = false;
      }
    },
    showModel() {
      this.$emit("update:model", false);
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.avatar_new = binary;
        };
      }
    },
    editLogin() {
      this.$emit("update:edit_var", this.new_login);
    },
    async uploadImage() {
      const avatar_pack = {
        user_id: this.$store.state.user_id,
        file: this.avatar_new,
      }
      await this.$store.dispatch("addAvatar", avatar_pack).then((res) => {
        this.$store.dispatch("fetchAvatar", this.$store.state.user_id);
      });
    },
    async saveFullEdit() {
      if (this.new_login == "") {
        this.toast_danger("Логин", "Поле логин не может быть пустым");
        return;
      }
      if (this.new_email == "") {
        this.toast_danger("Email", "Поле email не может быть пустым");
        return;
      }
      if (this.new_phone == "") {
        this.toast_danger("Телефон", "Поле телефон не может быть пустым");
        return;
      }
      if (this.avatar_new !== null) {
        await this.uploadImage();
      }

      const new_user = {
        user_id: this.$store.state.user_id,
        login: this.new_login,
        email: this.new_email,
        phone: this.new_phone,
      }
      await this.$store.dispatch("putUserByID", new_user).then((res) => {
        this.$store.dispatch("fetchUserInfo", this.$store.state.user_id);
        this.toast_success("Успешно", "Данные успешно обновлены");
        this.$emit("update:model", false);
      }).catch((err) => {
        this.toast_danger("Ошибка", "Ошибка при обновлении данных");
        this.$emit("update:model", false);
      });


    }
  },
  computed: {
    user_login() {
      return this.new_login;
    },
    user_email() {
      return this.new_email;
    },
    user_phone() {
      return this.new_phone;
    },
  },

}
</script>

<style scoped>
.review-label {
  font-size: 25px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
}

.review-desc {
  font-size: 20px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
}

.review-desc strong {
  font-size: 20px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  color: black;
}


input[type="file" i] {
  margin: 0 auto;
}

.skip_button {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  font-size: 20px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  background-color: gray;
}

.close-button {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 105%;
  right: -27%;
  cursor: pointer;
  z-index: 1000;
}


input[type="file" i] {
  margin: 0 auto;
}

.skip_button {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  font-size: 20px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  background-color: var(--main-haki-color);
}


.add_reviews {
  background-color: #908f8f;
  color: white;
  position: relative;
  max-width: 60vw;
}


.add_action {
  margin: 0 auto;
  margin-top: 30px;
}

.add_action input {
  margin: 0 auto;
}

.input__wrapper {
  width: 100%;
  position: relative;
  margin-top: 15px;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 45px;
  width: 60px;
  margin-right: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-icon {
  filter: brightness(0) invert(1);
}

.input__file-button {
  width: 100%;
  max-width: 290px;
  height: 45px;
  background: black;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 3px;
  cursor: pointer;
  margin: 0;
}
</style>
