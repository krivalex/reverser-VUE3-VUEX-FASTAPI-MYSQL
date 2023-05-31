<template>
  <div class="place-full">

    <swiper-image :place="place" />

    <div class="no-background">
      <div class="place-front">
        <h2>{{ place.name }}</h2>
        <p>, Almaty</p>
        <i class="fa fa-home" aria-hidden="true"></i>
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
            <i class="fa fa-map-marker" aria-hidden="true"></i>
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
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <p class="place-category">
              {{ place.start_work_time.slice(0, 5) }} - {{ place.end_work_time.slice(0, 5) }}
            </p>
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

      <add-review-modal v-if="model" v-model=model :model="model" :place_id="this.place.place_id"
        @update:model="showModel">
      </add-review-modal>


      <div class="place-rating">
        <div class="place-mark">
          <i class="fa fa-star" aria-hidden="true"></i>
          <p>9.6</p>
        </div>

        <div class="place-mark">
          <i class="fa fa-comments" aria-hidden="true"></i>
          <p>999</p>
        </div>

        <div class="place-mark">
          <i class="fa fa-trophy" aria-hidden="true"></i>
          <p>999</p>
        </div>

        <div class="place-mark">
          <i class="fa fa-heart" aria-hidden="true"></i>
          <p>999</p>
        </div>
      </div>

    </div>

    <div class="clist">
      <div v-for="tag in this.tags">
        <div v-if="tag !== ''" class="citem">
          {{ tag }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useRoute } from "vue-router";
import SwiperImage from "@/components/SwiperImage.vue";
import AddReviewModal from "@/components/AddReviewModal.vue";


export default {
  name: "place-id-info",
  async beforeMount() {
    const route = useRoute();
    await this.$store.dispatch('fetchPlaceInfo', route.params.id);
    await this.$store.dispatch('fetchPlaceImages', route.params.id);
  },
  computed: {
    place_images() {
      return this.$store.state.place_page_images;
    },
    place() {
      return this.$store.state.place_page_info;
    },
    tags() {
      return Object.values(this.place.tags);
    }
  },
  data() {
    return {
      model: false,
    };
  },
  methods: {
    showModel() {
      this.model = !this.model;
      this.$emit("update:model", this.model);
    },
  },
  components: {
    SwiperImage,
    AddReviewModal
  },

};  
</script>

<style scoped>
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

.fa-trophy {
  color: #4d52f3;
  margin-right: 3px;
  font-size: 20px;
}

.fa-comments {
  color: #4df36e;
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
  background-color: black;
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
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 30;
  position: relative;
  height: 500px;

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
