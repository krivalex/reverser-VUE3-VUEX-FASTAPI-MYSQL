<template>
  <my-modal :show="model" @:update:model="showModel">
    <div class="add_reviews">
      <img class="close-button" src="@/assets/close.png" @click="showModel" alt="close" />

      <div class="reviews">

        <div class="reviews_text">
          <h1 class="review-desc">Текст отзыва</h1>
          <my-text-area class="text-area" v-model="reviews_text" name="text_reviews"
            placeholder="Ваш отзыв о заведении, пожелания или замечания" @input="textInput"></my-text-area>
        </div>

        <div class="reviews_marks">
          <h1 class="review-desc" id="mark">Оценка</h1>
          <div class="all-reviews-marks-item">
            <div class="reviews_marks_item" v-for="mark in marks" :key="mark" :id="mark">
              <div v-if="mark <= Number(selected) && selected !== 0">
                <input type="radio" class="star" name="rating" :value=mark @click="ratioClick" checked />
                <i class="fa fa-star highlight"></i>
              </div>
              <div v-else>
                <input type="radio" class="star" name="rating" :value=mark @click="ratioClick" />
                <i class="non-highlight fa fa-star "></i>
              </div>
            </div>
          </div>
        </div>

        <form class="input__wrapper" enctype="multipart/form-data">
          <my-input id="input__file" class="input input__file" name="images" type="file" accept=".jpg, .png"
            @input="imagesInput"></my-input>
          <label for="input__file" class="input__file-button">
            <span class="input__file-icon-wrapper">
              <img class="input__file-icon" src="@/assets/camera-icon.svg" alt="Выбрать файл" width="25">
            </span>
            <span class="input__file-button-text">Выберите файл</span>
          </label>
        </form>

        <div class="add_action">
          <button @click="addReview" class="skip_button">Добавить отзыв</button>
        </div>

      </div>

    </div>

  </my-modal>
</template>

<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";
import MyModal from "@/components/UI/MyModal.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { createID } from "@/api/cheeze";
import { useRoute } from "vue-router";
import { createToast, clearToasts } from 'mosha-vue-toastify';

export default {
  name: "add-review-modal",
  components: {
    MyTextArea,
    MyModal,
    MyInput,
  },
  emits: ['update:model'],
  setup() {
    return {
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
    }
  },
  props: {
    model: {
      type: Boolean,
      required: true,
      default: false,
    },
    place_id: {
      required: true,
    },
  },
  data() {
    return {
      selected: 0,
      marks: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      reviews_text: "",
      review_image: null,
      upload_image: null,
      my_modal: this.model,
    };
  },
  methods: {
    textInput(event) {
      this.reviews_text = event.target.value;
    },
    ratioClick(event) {
      this.selected = event.target.value;
    },
    showModel() {
      this.$emit("update:model", false);
      // this.my_modal = false;
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.upload_image = binary;
        };
      }
    },
    async addReview() {
      const id = createID();

      const data = {
        review_id: id,
        place_id: this.place_id,
        user_id: localStorage.getItem('user_id'),
        date: new Date(),
        text: this.reviews_text,
        mark: this.selected,
      }

      const review_pack = {
        review_id: id,
        file: this.upload_image
      }

      const route = useRoute();
      await this.$store.dispatch('addReview', data);
      await this.$store.dispatch('addReviewImage', review_pack).then(() => {
        this.$store.dispatch("fetchPlaceInfo", this.place_id);
        this.$store.dispatch("fetchReviewItemInfo", this.place_id);
        this.$emit("update:model", false);
        this.toast_success('Отзыв добавлен', 'Ваш отзыв успешно добавлен');

      });
    },
  },
};

</script>

<style scoped>
.all-reviews-marks-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
}

.reviews_marks_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 80vw;
}

.reviews_marks_item i {
  position: absolute;
  left: 0;
  top: 0;
  color: #000000;
  z-index: 1;
  font-size: 20px;
  margin-right: 10px;
}

.reviews_marks_item input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  margin-right: 10px;
  width: 20px;
}


.highlight::before {
  content: "\f005";
  font-family: FontAwesome;
  color: rgb(255, 247, 0);
}

.add_reviews {
  background-color: #DC143C;
  color: white;
  position: relative;
  max-width: 60vw;
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

.text-area {
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
}

.review-desc {
  font-size: 30px;
  text-align: center;
}

.add_action {
  margin: 0 auto;
  margin-top: 30px;
}

.add_action input {
  margin: 0 auto;
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

.fa-star {
  color: #f6ff00;
  margin-right: 3px;
  font-size: 20px;
  -webkit-text-stroke: #000000 0.5px;
}

.add_reviews {
  background-color: #908f8f;
  color: white;
  position: relative;
  max-width: 60vw;
}


.review-desc {
  font-size: 30px;
  text-align: center;
}

.add_action {
  margin: 0 auto;
  margin-top: 30px;
}

.add_action input {
  margin: 0 auto;
}

.all-reviews-marks-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.reviews_marks_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 80vw;
}

.reviews_marks_item i {
  position: absolute;
  left: 0;
  top: 0;
  color: #000000;
  z-index: 1;
  font-size: 20px;
  margin-right: 10px;
}

.reviews_marks_item input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  margin-right: 10px;
  width: 20px;
}

.fa-star {
  color: black;
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
  margin: 0 auto;
}
</style>
