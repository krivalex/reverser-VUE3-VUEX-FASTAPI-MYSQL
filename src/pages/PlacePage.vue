<template>
  <div class="container place-full">

    <div class="no-background">
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

        <swiper :options="swiperOptions" v-if="images !== null && images !== 'null'">
          <swiper-slide v-for="(slide, index) in images" :key="index">
            <img class="place-image" :src="slide" alt="place" />
            <span class="place-number-of-photo">{{ index + 1 }} / {{ images.length }}</span>
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


      <div class="place-info">

        <div class="place-options">

          <div class="place-option">
            <i class="fa fa-coffee" aria-hidden="true"></i>
            <p class="place-category">
              {{ place.category }}, {{ place.subcategory }}
            </p>
          </div>

          <div class="place-option">
            <i class="fa fa-car" aria-hidden="true"></i>
            <p class="place-category">
              {{ place.geometry_name }}
            </p>
          </div>

          <div class="place-option">
            <i class="fa fa-phone" aria-hidden="true"></i>
            <p class="place-category">
              {{ place.phone }}
            </p>
          </div>

          <div class="place-option" v-if="place.start_work_time && place.end_work_time">
            <i class="fa fa-fire" aria-hidden="true"></i>
            <p class="place-category">
              {{ place.start_work_time.slice(0, 5) }} - {{ place.end_work_time.slice(0, 5) }}
            </p>
          </div>

        </div>

        <div class="place-social-media">

          <div class="place-social-media-item" v-if="place.TWOgis">
            <img class="social-logo" src="@/assets/2gis.png">
          </div>

          <div class="place-social-media-item" v-if="place.instagram">
            <img class="social-logo" src="@/assets/instagram.png">
          </div>

          <div class="place-social-media-item" v-if="place.whatsapp">
            <img class="social-logo" src="@/assets/whatsapp.png">
          </div>

        </div>

        <div class="place-long-description">
          <p class="long-decription" v-if="place.long_description">{{ place.long_description }}</p>
          <p class="long-decription" v-else>Длинное описание</p>
        </div>
      </div>

      <div class="place-review-info">
        <h2>Были здесь?</h2>
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
              <my-input v-model="upload_image" name="images" type="file" accept=".jpg, .png"
                @input="imagesInput"></my-input>
            </form>

            <div class="add_action">
              <button @click="addReview" class="skip_button">Добавить отзыв</button>
            </div>

          </div>

        </div>

      </my-modal>

    </div>

    <div class="clist">
      <div v-for="tag in this.tags">
        <div class="citem">
          {{ tag }}
        </div>
      </div>
    </div>


    <div class="zaglushka"></div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import "swiper/css/bundle";
import MyModal from "@/components/UI/MyModal.vue";
import { createID } from "@/api/cheeze";
import { getPlaceByID, postReview, uploadReviewImageByID, getImageByID } from "@/api/methods.js";



export default {
  name: "place-id-info",
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
      model: false,
      selected: 0,
      marks: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      reviews_text: "",
      place: {},
      tags: [],
      images: [],
      upload_image: null,
    };
  },
  async mounted() {
    const route = useRoute();
    this.images = await getImageByID(route.params.id);
  },
  methods: {
    TwoGISRedirect() {
      window.location.assign(this.place.TWOgis)
    },
    redirectPlace() {
      this.$router.push(`/place/${this.place.place_id}`)
    },
    redirectReviews() {
      this.$router.push(`/reviews/${this.place.place_id}`)
    },
    textInput(event) {
      console.log(event.target.value);
    },
    showModel() {
      this.model = !this.model;
    },
    ratioClick(event) {
      console.log(event.target.value);
      this.selected = event.target.value;
    },
    textInput(event) {
      this.reviews_text = event.target.value;
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
    addReview() {

      const id = createID();

      const data = {
        review_id: id,
        place_id: this.place.place_id,
        user_id: localStorage.getItem('user_id'),
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
        file: this.upload_image
      }

      uploadReviewImageByID(review_pack)
        .then((response) => {
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
    MyModal
  },
  beforeMount() {
    const route = useRoute();

    getPlaceByID(route.params.id)
      .then((response) => {
        this.place = response.data;
        this.tags = Object.values(response.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};  
</script>

<style scoped>
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

.place-info {
  margin-top: 20px;
}

.place-options {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10px;
}

.place-option {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.place-option i {
  font-size: 20px;
  margin-right: 15px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-option p {
  font-size: 18px;
  font-weight: 400;
}

.place-social-media {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}

.social-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 15px;
}

.place-long-description {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 400;
}


.zaglushka {
  height: 100px;
}

.place-review-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
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

.clist {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 80px;
  justify-content: space-evenly;
  align-items: center;
}

.citem {
  padding: 5px 10px;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #FD6D6D;
  color: white
}

.place-tags {
  display: flex;
  flex-direction: colsumn;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 30px;
}

.no-background {
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

@media screen and (min-width: 768px) {
  .place-full {
    padding: 30px 100px;
    overflow: hidden;
  }

  .no-background {
    padding: 50px
  }

  .place-front h2 {
    font-size: 40px;
  }

  .place-front p {
    font-size: 30px;
  }

  .place-front i {
    font-size: 30px;
    margin-bottom: 4px;
  }

  .place-mark p,
  .place-mark i {
    font-size: 30px;
  }

  .place-image-slider {
    height: 500px;
  }


  .place-image {
    height: 500px;
  }

  .short-decription {
    margin-top: 15px;
    font-size: 25px;
  }

  .place-nav-like {
    height: 60px;
  }

  .button-nav {
    height: 60px;
    width: 600px;
  }

  #info {
    width: 300px;
    font-size: 20px;
  }

  #review {
    width: 300px;
    font-size: 20px;
  }

  .like {
    position: absolute;
    right: 0;
  }

  .like i {
    font-size: 60px;
    color: black;
  }

  .like i:hover {
    color: red;
  }

  .place-option p,
  .place-option i {
    font-size: 22px;
  }

  .place-options {
    margin-top: 50px;
  }

  .place-review-info h2 {
    font-size: 40px;
  }

  .place-button-rewiew {
    transform: scale(1.3);
  }

  .clist div {
    font-size: 20px;
    margin: 5px;
  }

  .place-number-of-photo {
    font-size: 50px;
  }
}
</style>
