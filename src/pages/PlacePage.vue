

<template>
  <div class="place-full">

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

      <swiper :options="swiperOptions">
        <swiper-slide v-for="(slide, index) in place.images" :key="index">
          <img class="place-image" :src="slide" alt="place" />
          <span class="place-number-of-photo">{{ index + 1 }} / {{ place.images.length }}</span>
        </swiper-slide>
      </swiper>

    </div>


    <div class="place-short-description">
      <p class="short-decription" v-if="place.short_description">{{ place.short_description }}</p>
      <p class="short-decription" v-else>Короткое описание</p>
    </div>

    <div class="place-nav-like">
      <div class="button-nav">
        <button id="info" class="place-info">Инфо</button>
        <button id="review" class="place-rewiew">Отзывы</button>
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

        <div class="place-option">
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
      <button>Оставить отзыв</button>
    </div>

    <div class="clist">
      <div v-for="tag in place.tags">
        <div class="citem">
          {{ tag.name }}
        </div>
      </div>
    </div>


    <div class="zaglushka"></div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { data } from "@/data";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import "swiper/css/bundle";



export default {
  setup() {
    const route = useRoute();
    const place = data.find((place) => place.id == route.params.id);

    return {
      place
    };
  },
  name: "place-id-info",
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
    };
  },
  methods: {
    TwoGISRedirect() {
      window.location.assign(this.place.TWOgis)
    },
  },
  components: {
    Swiper,
    SwiperSlide,
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

.place-full {
  max-height: 95vh;
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
</style>
