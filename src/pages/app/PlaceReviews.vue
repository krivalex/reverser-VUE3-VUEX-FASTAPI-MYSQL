<template>
  <div class="place-full" v-if="place">

    <swiper-image :place="place"></swiper-image>

    <div class="no-background">
      <div class="place-front">
        <h2>{{ place.name }}</h2>
        <p>, Almaty</p>
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>

      <div class="place-button-rewiew">
        <button @click="showModel">Оставить отзыв</button>
      </div>

      <add-review-modal v-if="model" v-model=model :model="model" :place_id="this.place.place_id"
        @update:model="showModel">
      </add-review-modal>

      <div class="all-reviews">
        <div class="reviews-list">
          <div v-for="review in reviews" :key="review.review_id">
            <review-item :review="review"></review-item>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-else>
    <my-loader />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import ReviewItem from "@/components/ReviewItem.vue";
import AddReviewModal from "@/components/AddReviewModal.vue";
import SwiperImage from "@/components/SwiperImage.vue";
import MyLoader from "@/components/UI/MyLoader.vue";

export default {
  name: "place-id-reviews",
  components: {
    ReviewItem,
    AddReviewModal,
    SwiperImage,
    MyLoader,
  },
  async beforeMount() {
    const route = useRoute();
    await this.$store.dispatch("fetchPlaceInfo", route.params.id);
    await this.$store.dispatch("fetchReviewItemInfo", route.params.id);

  },
  computed: {
    place() {
      return this.$store.state.place_page_info;
    },
    reviews() {
      if (!this.$store.state.review_item_info) {
        return [];
      }
      else {
        let sorted_reviews = [...this.$store.state.review_item_info];
        sorted_reviews.sort((a, b) => {
          // Сравниваем значения полей "date" в обратном порядке
          return new Date(b.date) - new Date(a.date);
        });
        return sorted_reviews;
      }
    },
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

  .place-button-rewiew {
    transform: scale(1.3);
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .place-full {
    overflow: hidden;
  }
}
</style>
