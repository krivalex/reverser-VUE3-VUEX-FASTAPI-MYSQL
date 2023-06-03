<template>
  <section id="profile">
    <div class="profile-label">
      <h1>Мои отзывы</h1>
    </div>
    <div v-for="review in reviews" :key="review.review_id" class="reviews">
      <review-item class="review" :review="review"></review-item>
      <h1 class="review_info">
        <router-link :to="{ name: 'place', params: { id: review.place_id } }">
          Заведение/Событие: <strong>{{ place_name }} <i class="fa fa-arrow-right"></i></strong>
        </router-link>
      </h1>

    </div>
  </section>
</template>

<script>
import ReviewItem from '@/components/ReviewItem.vue';
export default {
  name: "answer-to-reviews-page",
  components: {
    ReviewItem,
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
  background-color: white;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 20px;
  font-size: 20px;
}

.review_info a {
  text-decoration: none;
  color: black;
}

.review_info a strong {
  color: white;
  background-color: black;
  padding: 10px;
  border-radius: 20px;
}

.fa-arrow-right {
  color: var(--main-haki-color);
}

.review {
  margin-bottom: 0px;
}
</style>
