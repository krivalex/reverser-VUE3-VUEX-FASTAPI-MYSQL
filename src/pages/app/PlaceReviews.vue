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

    <add-review-modal v-if="model" v-model=model :model="model" :place_id="this.place.place_id" @update:model="showModel">
    </add-review-modal>

    <div class="all-reviews">
      <div class="reviews-list">
        <div v-for="review in reviews" :key="review.review_id">
          <review-item :review="review"></review-item>
        </div>
      </div>
    </div>


  </div>
  <div class="zaglushka"></div>
</template>

<script>
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css/bundle";
import ReviewItem from "@/components/ReviewItem.vue";
import AddReviewModal from "@/components/AddReviewModal.vue";

export default {
  name: "place-id-reviews",
  components: {
    Swiper,
    SwiperSlide,
    ReviewItem,
    AddReviewModal
  },
  async beforeMount() {
    const route = useRoute();

    await this.$store.dispatch("fetchPlaceImages", route.params.id);
    await this.$store.dispatch("fetchPlaceInfo", route.params.id);
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
      let sorted_reviews = [...this.$store.state.review_item_info];

      sorted_reviews.sort((a, b) => {
        // Сравниваем значения полей "date" в обратном порядке
        return new Date(b.date) - new Date(a.date);
      });

      return sorted_reviews;
    },
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
    showModel() {
      this.model = !this.model;
      this.$emit("update:model", this.model);
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
  },
};
</script>

<style scoped>
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

.reviews-item {
  margin-top: 15px;
  position: relative;
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
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

.fa-heart {
  color: #DC143C;
  margin-right: 3px;
  font-size: 20px;
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

.place-button-rewiew {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.place-button-rewiew button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 15px;
}

.no-background {
  background-color: white;
  padding: 7px 10px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 30;
  position: relative;

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

  .place-image-slider {
    height: 500px;
  }

  .place-image {
    height: 500px;
  }

  .place-button-rewiew {
    transform: scale(1.3);
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .place-number-of-photo {
    font-size: 50px;
  }

  .place-full {
    overflow: hidden;
  }

  .reviews-item {
    width: 70%;
    margin: 30px auto;
  }
}
</style>
