<template>
  <div class="place-full">

    <div class="place-image-slider">

      <swiper :options="swiperOptions" v-if="this.place_images !== null && this.place_images !== 'null'">
        <swiper-slide v-for="(slide, index) in this.place_images" :key="index">
          <img class="place-image" :src="slide" alt="place" />
          <span class="place-number-of-photo">{{ index + 1 }} / {{ this.place_images.length }}</span>
        </swiper-slide>
      </swiper>

      <div class="place-image" v-else>
        <img class="place-image" src="@/assets/no-image.jpg" alt="place" />
      </div>

      <div class="icon-button">
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-share" aria-hidden="true" @click="share"></i>
      </div>

      <div class="place-name">
        <h2>{{ place.short_description }}</h2>
      </div>

      <div class="place-social-media">

        <div class="place-social-media-item" v-if="place.two_gis_url" @click="TwoGISRedirect">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
        </div>

        <div class="place-social-media-item" v-if="place.instagram_link" @click="InstagramRedirect">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </div>

        <div class="place-social-media-item" v-if="place.phone" @click="WhatsappRedirect">
          <i class="fa fa-whatsapp" aria-hidden="true"></i>
        </div>

      </div>

    </div>

  </div>

  <div class="no-background">
    <div class="place-front">
      <h2>{{ place.name }}</h2>
      <p>, Almaty</p>
      <i class="fa fa-home" aria-hidden="true"></i>
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


    <div class="all-reviews">
      <div class="reviews-list">
        <div v-for="review in reviews" :key="review.review_id" class="reviews-item">

          <div class="reviews-item-header">
            <div class="reviews-image-h1">
              <img :src="review.avatar" alt="загрузка">
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

          <!-- <div class="reviews-item-image">
            <img :src="getImage(review.review_id)" alt="image">
          </div> -->

          <div class="reviews-item-text">
            <p>{{ review.text }}</p>
          </div>

          <div class="reviews-item-date">
            <p>{{ review.date.slice(0, 10) }}</p>
            <p>/</p>
            <p>{{ review.date.slice(11) }}</p>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css/bundle";
import MyModal from "@/components/UI/MyModal.vue";
import { createID } from "@/api/cheeze";
export default {
  name: "place-id-reviews",
  components: {
    'my-text-area': MyTextArea,
    Swiper,
    SwiperSlide,
    MyModal,
  },
  async beforeMount() {
    const route = useRoute();

    await this.$store.dispatch("fetchPlaceImages", route.params.id);
    await this.$store.dispatch("fetchPlaceInfo", route.params.id);
    await this.$store.dispatch("fetchReviewItemImages", route.params.id);
    await this.$store.dispatch("fetchReviewItemInfo", route.params.id);

  },
  computed: {
    place_images() {
      return this.$store.state.place_page_images;
    },
    place() {
      return this.$store.state.place_page_info;
    },
    reviews() {
      return this.$store.state.review_item_info;
    },
    all_reviews_image() {
      return this.$store.state.review_item_images;
    }
  },


  data() {
    return {
      selected: 0,
      marks: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
      model: false,
      reviews_text: "",
      review_image: null,
      upload_image: null,
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
      this.$router.push(`/place/${this.place.place_id}`)
    },
    redirectReviews() {
      this.$router.push(`/reviews/${this.place.place_id}`)
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
    share() {
      const dummyInput = document.createElement('input');
      dummyInput.value = window.location.href;
      document.body.appendChild(dummyInput);
      dummyInput.select();
      document.execCommand('copy');
      document.body.removeChild(dummyInput);

      if (navigator.share) {
        navigator.share({
          url: window.location.href
        })
          .then(() => console.log('Ссылка успешно поделена'))
          .catch((error) => console.log('Ошибка при попытке поделиться:', error));
      } else {
        console.log('Браузер не поддерживает функцию поделиться');
      }
    },
    TwoGISRedirect() {
      window.open(this.place.two_gis_url, '_blank')
    },
    WhatsappRedirect() {
      window.open(`https://wa.me/${this.place.phone}`, '_blank')
    },
    InstagramRedirect() {
      window.open(this.place.instagram_link, '_blank')
    },
    async addReview() {
      const id = createID();
      const data = {
        review_id: id,
        place_id: this.place.place_id,
        user_id: localStorage.getItem('user_id'),
        date: new Date(),
        text: this.reviews_text,
        mark: this.selected,
      }

      const review_pack = {
        review_id: id,
        file: this.upload_image
      }
      this.model = !this.model;

      await this.$store.dispatch('addReview', data);
      await this.$store.dispatch('addReviewImage', review_pack);

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
  font-size: 8px;
}

.reviews-image-h1 h1 {
  max-width: 50px;
}

.reviews-image-h1 img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 7px;
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

.reviews-item {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

@media screen and (min-width: 768px) {
  .place-full {
    padding: 30px 100px;
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
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .clist div {
    font-size: 20px;
    margin: 5px;
  }

  .place-number-of-photo {
    font-size: 50px;
  }

  .reviews-item-header-mark {
    width: 200px;
  }

  .marks i {
    font-size: 22px;
  }

  .reviews-image-h1 h1 {
    font-size: 22px;
    margin-left: 15px;
  }

  .reviews-item-image img {
    height: 360px;
    margin-top: 20px;
  }

  .reviews-image-h1 img {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .reviews-item-date p {
    font-size: 15px;
  }

  .place-full {
    overflow: hidden;
  }

  .reviews-item {
    width: 70%;
    margin: 30px auto;
  }

  .reviews-item-date {
    margin-top: 20px;
  }


}

.place-full {
  font-family: 'Play', sans-serif;
}

.place-front {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}

.place-front h2 {
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-front p {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 2px;
  color: gray;
}

.place-front i {
  font-size: 22px;
  margin-bottom: 2px;
  color: gray;
}

.place-rating {
  position: absolute;
  bottom: 0;
  max-width: 100vw;
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
}

.place-mark {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.fa-heart {
  color: #DC143C;
  margin-right: 3px;
  font-size: 20px;
}

.fa-star {
  color: #f6ff00;
  margin-right: 3px;
  font-size: 20px;
  -webkit-text-stroke: #000000 0.5px;
}

.place-mark p {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-image-slider {
  width: 100%;
  height: 350px;
  position: relative;
}

.place-image {
  width: 100%;
  height: 370px;
  object-fit: cover;
  position: relative;
}

.place-number-of-photo {
  position: absolute;
  bottom: 6%;
  right: 0;
  background-color: rgba(245, 245, 245, 0.545);
  -webkit-text-stroke: 1px #000000;
  color: white;
  padding: 7px;
  font-size: larger;
  font-weight: 600;
  font-size: 30px;
  margin-right: 15px;
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
  margin-top: 40px;
  position: relative;
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
  color: gray;
}

.place-option p {
  font-size: 18px;
  font-weight: 400;
}

.place-social-media {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}


.social-logo {
  width: 50px;
  height: 50px;
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
  background-color: black;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 15px;
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
  font-family: 'Unbounded', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #908f8f;
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
  padding: 30px 10px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 30;
  position: relative;

}

.add_reviews {
  background-color: #908f8f;
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



  .place-image-slider {
    height: 500px;
  }


  .place-image {
    height: 500px;
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


  .place-button-rewiew {
    transform: scale(1.3);
  }

  .place-number-of-photo {
    font-size: 50px;
  }
}

.icon-button i {
  -webkit-text-stroke: 2px #000000;
  font-size: 30px;
  background-color: rgba(245, 245, 245, 0.825);
  margin-left: 12px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 11;
}

.icon-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  padding: 10px;
}

.place-name h2 {
  font-size: 20px;
  position: absolute;
  margin-left: 15px;
  bottom: 0;
  left: 0;
  padding: 5px 10px;
  background-color: rgba(245, 245, 245, 0.695);
  z-index: 20;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.place-social-media-item {
  font-size: 35px;
  background-color: rgba(245, 245, 245, 0.901);
  margin-left: 12px;
  padding: 5px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-social-media-item i {
  -webkit-text-stroke: 0.5px #000000;
  font-size: 35px;
}

.fa-instagram {
  color: #e75f8c;
  font-size: 30px;
}

.fa-whatsapp {
  color: #25D366;
  font-size: 30px;
}

.fa-map-marker {
  color: #5c8aed;
  font-size: 30px;
}
</style>
