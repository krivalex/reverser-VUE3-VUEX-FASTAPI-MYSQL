<template>
  <section id="my-reviews">
    <div class="place" v-for="review in this.all_reviews" :key="review.review_id">

      <div class="reviews-item-header">

        <div class="reviews-image-h1">
          <img :src="review.avatar" alt="загрузка">
          <h1>{{ review.username }}</h1>
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
        <img :src="review.image" alt="image">
      </div>

      <div class="reviews-item-text">
        <p>{{ review.text }}</p>
      </div>

      <div class="reviews-item-date">
        <p>{{ review.date.slice(0, 10) }}</p>
        <p>/</p>
        <p>{{ review.date.slice(11) }}</p>
      </div>

      <div class="reviews-item-place">
        <router-link :to="{ name: 'place', params: { id: review.place_id } }">
          <p>{{ placeInfo(review.place_id) }}</p>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>

export default {
  name: "my-reviews",
  computed: {
    all_reviews() {
      return this.$store.state.user_info_reviews;
    },
  },
  async mounted() {
    this.all_reviews = await this.$store.dispatch("fetchUserReviews", Number(localStorage.getItem("user_id")));
  },
  methods: {
    placeInfo(place_id) {
      this.$store.dispatch("fetchPlaceInfo", place_id);
      return this.$store.getters.getPlaceByID.name
    },
  },
};
</script>

<style>
#my-reviews {
  width: 100vw;
  height: 100%;
}

.gold {
  color: gold;
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

.reviews-item {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
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


.reviews_text {
  max-width: 80%;
  margin: 15px auto;
}

.reviews_text strong {
  color: lightgray;
}
</style>
