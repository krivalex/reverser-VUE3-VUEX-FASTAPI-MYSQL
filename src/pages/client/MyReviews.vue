<template>
  <section id="profile">
    <div v-if="reviews">
      <div class="profile-label">
        <h1>Мои отзывы</h1>
      </div>
      <div v-if="reviews.length !== 0">
        <div v-for="review in reviews" :key="review.review_id" class="reviews">
          <review-item class="review" :review="review"></review-item>
          <h1 class="review_info">
            <router-link :to="{ name: 'place', params: { id: review.place_id } }">
              <strong>{{ place_name }} <i class="fa fa-arrow-right"></i></strong>
            </router-link>
          </h1>
        </div>
      </div>
      <div v-else>
        <h1 class="info">Вы еще не оставили не одного отзыва</h1>
      </div>
    </div>
    <div v-else>
      <my-loader></my-loader>
    </div>

  </section>
</template>

<script>
import ReviewItem from '@/components/ReviewItem.vue';
import MyLoader from '@/components/UI/MyLoader.vue';

export default {
  name: "answer-to-reviews-page",
  components: {
    ReviewItem,
    MyLoader
  },
  async mounted() {
    const user_id = Number(localStorage.getItem("user_id"));
    await this.$store.dispatch("fetchUserReviews", user_id);
    await this.$store.state.user_info_reviews.map(item => this.$store.dispatch("fetchReviewItemInfo", item.place_id));
    await this.$store.state.user_info_reviews.map(item => this.$store.dispatch("fetchPlaceInfo", item.place_id));
  },
  computed: {
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
    place_name() {
      if (!this.$store.state.place_page_info) {
        return "";
      }
      return this.$store.state.place_page_info.name;
    },
  }
};

</script>

<style scoped>
#profile {
  width: 100vw;
  height: calc(100% + 60px);
  margin: auto auto;
}

.profile-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}

.profile-label h1 {
  font-size: 30px;
  padding: 5px 20px;
  margin: 0;
  margin-right: 10px;
  background-color: var(--main-haki-color);
  color: white;
  border-radius: 10px;
}

.reviews {
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: 0px;
}

.review_info {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 20px;
  font-size: 20px;
}

.review_info a {
  text-decoration: none;
  color: black;
  font-size: 15px;
}

.review_info a strong {
  color: white;
  background-color: black;
  padding: 15px;
  border-radius: 20px;
  font-size: 25px;
}

.fa-arrow-right {
  color: white;
}

.review {
  margin-bottom: 0px;
  background-color: transparent;
  box-shadow: none;
}

.info {
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  color: var(--main-haki-color);
}
</style>
