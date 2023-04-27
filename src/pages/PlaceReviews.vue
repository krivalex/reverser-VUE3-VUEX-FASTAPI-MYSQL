<template>
  <div class="place-full container">

    <div class="place-front">
      <h2>{{ place.name }}</h2>
      <p>, Almaty</p>
      <i class="fa fa-home" aria-hidden="true"></i>
    </div>

    <div class="place-rating">

      <div class="place-mark">
        <i class="fa fa-star" aria-hidden="true"></i>
        <p>9.6</p>
      </div>

      <div class="place-mark">
        <i class="fa fa-heart" aria-hidden="true"></i>
        <p>999</p>
      </div>



    </div>

    <div class="place-image-slider">

      <swiper :options="swiperOptions" v-if="place.images !== null && place.images !== 'null'">
        <swiper-slide v-for="(slide, index) in place.images" :key="index">
          <img class="place-image" :src="slide" alt="place" />
          <span class="place-number-of-photo">{{ index + 1 }} / {{ place.images.length }}</span>
        </swiper-slide>
      </swiper>

      <div class="place-image" v-else>
        <img class="place-image" src="@/assets/no-image.jpg" alt="place" />
      </div>

    </div>

    <div class="place-short-description">
      <p class="short-decription" v-if="place.short_description">{{ place.short_description }}</p>
      <p class="short-decription" v-else>Короткое описание</p>
    </div>

    <div class="place-nav-like">
      <div class="button-nav">
        <button @click="redirectPlace" id="info" class="place-info">Инфо</button>
        <button @click="redirectReviews" id="review" class="place-rewiew">Отзывы</button>
      </div>
      <div class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </div>

    <div class="place-button-rewiew">
      <button @click="showModel">Оставить отзыв</button>
    </div>

    <my-modal v-model:show="model">
      <div class="add_reviews">
        <img class="close-button" src="@/assets/close.png" @click="showModel" alt="close" />

        <div class="reviews">

          <div class="reviews_text">
            <h1 class="review-desc">Текст отзыва</h1>
            <my-text-area class="text-area" v-model="reviews_text" name="text_reviews" placeholder="Текст"
              @input="textInput"></my-text-area>
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

          <form class="add_photo" enctype="multipart/form-data">
            <my-input v-model="images" name="images" type="file" accept=".jpg, .png" @input="imagesInput"></my-input>
          </form>

          <div class="add_action">
            <button @click="addReview" class="skip_button">Добавить отзыв</button>
          </div>

        </div>

      </div>

    </my-modal>


    <div class="all-reviews">
      <div class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="reviews-item">

          <div class="reviews-item-header">
            <div class="reviews-image-h1">
              <img :src="review.avatar" alt="avatar">
              <h1>{{ review.login }}</h1>
            </div>
            <div class="reviews-item-header-mark">
              <div class="marks" v-for="mark in review.mark">
                <i class="gold fa fa-star" aria-hidden="true"></i>
              </div>
              <div class="marks" v-for="mark in 10 - review.mark">
                <i class="fa fa-star" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div class="reviews-item-image">
            <img :src="review_image" alt="image">
          </div>

          <div class="reviews-item-text">
            <p>{{ review.text }}</p>
          </div>

          <div class="reviews-item-date">
            <p>{{ review.date }}</p>
          </div>

        </div>
      </div>
    </div>



  </div>
  <div class="zaglushka"></div>
</template>

<script>
import { useRoute } from "vue-router";
import MyTextArea from "@/components/UI/MyTextArea.vue";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import "swiper/css/bundle";
import MyModal from "@/components/UI/MyModal.vue";
import { getPlaceByID, getReviewsByID, postReview, uploadReviewImageByID, getImageReviewByID } from "@/api/methods.js";
import { createID } from "@/api/cheeze";

export default {
  name: "place-id-reviews",
  components: {
    'my-text-area': MyTextArea,
  },
  beforeMount() {
    const route = useRoute();

    getPlaceByID(route.params.id)
      .then((response) => {
        this.place = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    getReviewsByID(route.params.id)
      .then((response) => {
        this.reviews = response.data;
        console.log(this.reviews);
      })
      .catch((error) => {
        console.log(error);
      });

    getImageReviewByID(this.reviews.review_id)
      .then((response) => {
        this.review_image = response.data;
        console.log(this.review_image);
      })
  },
  data() {
    return {
      place: {},
      reviews: [],

      selected: 0,
      marks: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
      model: false,
      reviews_text: '',
      review_image: '',
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
      this.model = !this.model;
    },
    redirectPlace() {
      this.$router.push(`/place/${this.place.id}`)
    },
    redirectReviews() {
      this.$router.push(`/reviews/${this.place.id}`)
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.review_image = binary;
        };
      }
    },
    addReview() {

      const id = createID();

      const data = {
        review_id: id,
        place_id: this.place.place_id,
        user_id: 15521349,
        date: new Date(),
        text: this.reviews_text,
        mark: this.selected,
      }

      this.model = !this.model;

      postReview(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const review_pack = {
        review_id: id,
        file: this.review_image
      }

      uploadReviewImageByID(review_pack).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    MyModal,
  },
};
</script>

<style scoped>
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


.highlight::before {
  content: "\f005";
  font-family: FontAwesome;
  color: rgb(255, 247, 0);
}

.place-full {
  min-height: 90vh;
  background-color: white;
}

.place-front {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.place-front h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-front p {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 2px;
  color: gray;
}

.place-front i {
  font-size: 18px;
  margin-bottom: 2px;
  color: gray;
}

.place-rating {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 5px;
}

.place-mark {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.place-mark i {
  color: #DC143C;
  margin-right: 3px;
  font-size: 20px;
}

.place-mark p {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-image-slider {
  width: 100%;
  height: 200px;
  position: relative;
}

.place-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  position: relative;
}

.place-number-of-photo {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 7px;
  font-size: larger;
}

.place-short-description {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
}

.place-nav-like {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
}

#info {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

#review {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.like {
  position: absolute;
  right: 0;
}

.like i {
  font-size: 35px;
  color: black;
}

.like i:hover {
  color: red;
}

.button-nav {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 200px;
  height: 30px;
}

.button-nav button {
  background-color: lightgray;
  border: none;
  color: black;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 3px solid white;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-button-rewiew {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.place-button-rewiew button {
  background-color: #DC143C;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 15px;
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
  right: -30%;
  cursor: pointer;
  z-index: 1000;
}

.text-area {
  width: 100%;
  height: 150px;
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
  background-color: gray;
}

.add_photo {
  margin-top: 30px;
}

#mark {
  margin-bottom: 10px;
}

.reviews-item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.reviews-item-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.gold {
  color: gold;
}

.reviews-item-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.reviews-item-header-mark {
  display: flex;
  flex-direction: row;
  width: 140px;
}

.marks i {
  font-size: 15px;
}

.marks {
  display: flex;
  align-items: flex-end;
}

.reviews-image-h1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.reviews-item-text {
  margin-top: 10px;
  font-style: italic;
  margin-bottom: 5px;
}

.reviews-item-date {
  font-size: 12px;
  color: gray;
  font-style: italic;
  display: flex;
  justify-content: flex-end;
}

.reviews-item {
  margin-top: 15px;
}

.reviews-item-text p {
  max-width: 80%;
}
</style>
