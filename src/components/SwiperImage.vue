<template>
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
      <favourite-button :place="place"></favourite-button>
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
</template>

<script>
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css/bundle";
import FavouriteButton from "@/components/FavouriteButton.vue";

export default {
  name: 'swiper-image',
  props: {
    place: {
      type: Object,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    FavouriteButton,
  },
  async beforeMount() {
    const route = useRoute();
    await this.$store.dispatch("fetchPlaceImages", route.params.id);
  },
  computed: {
    place_images() {
      return this.$store.state.place_page_images;
    },
  },
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
  }
}
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

.icon-button i {
  -webkit-text-stroke: 2px #000000;
  font-size: 30px;
  background-color: rgba(245, 245, 245, 0.825);
  margin-left: 12px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}


.icon-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

  .place-image-slider {
    height: 500px;
  }

  .place-image {
    height: 500px;
  }

  .place-number-of-photo {
    font-size: 50px;
  }
}
</style>
