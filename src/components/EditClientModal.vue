<template>
  <my-modal v-model:show="model" @:update:model="showModel">
    <div class="add_reviews">
      <img class="close-button" src="@/assets/close.png" @click="showModel" alt="close" />

      <div class="reviews">

        <div class="reviews_text">
          <h1 class="review-label">Ваш логин:</h1>
          <h1 class="review-desc"><strong>{{ user_login }}</strong></h1>
          <edit-data-input :edit_var="user.login"></edit-data-input>

        </div>

        <div class="reviews_text">
          <h1 class="review-label">Ваш email:</h1>
          <h1 class="review-desc"><strong>{{ user.email }}</strong></h1>
        </div>

        <div class="reviews_text">
          <h1 class="review-label">Ваш телефон:</h1>
          <h1 class="review-desc"><strong>{{ user.phone }}</strong></h1>
        </div>


        <div class="reviews_text">
          <h1 class="review-desc">Загрузить аватар:</h1>
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
          <button @click="uploadImage" class="skip_button">Обновить профиль</button>
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

export default {
  name: "edit-client-modal",
  components: {
    MyInput,
    MyTextArea,
    MyModal,
    EditDataInput,
  },
  emits: ['update:model'],
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
  data() {
    return {
      model: this.model,
      avatar_new: null,
      new_login: '',
      edit_var: undefined,
    }
  },
  methods: {
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
    async uploadImage() {
      const avatar_pack = {
        user_id: this.$store.state.user_id,
        file: this.avatar_new,
      }

      await this.$store.dispatch("addAvatar", avatar_pack).then((res) => {
        this.$store.dispatch("fetchAvatar", this.$store.state.user_id);
      });

      this.$emit("update:model", false);
    }
  },
  computed: {
    user_login() {
      console.log(this.edit_var);
      return this.edit_var !== undefined ? this.edit_var : this.user.login;
    }
  },

}
</script>

<style scoped>
.review-desc {
  font-size: 25px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
}

.review-desc strong {
  font-size: 20px;
  font-style: italic;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  color: var(--main-haki-color);
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
  margin-top: 30px;
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
