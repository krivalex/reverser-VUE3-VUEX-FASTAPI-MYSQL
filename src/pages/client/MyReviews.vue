<template>
  <div class="place" v-for="review in this.all_reviews" :key="review.review_id">
    <div class="profile-favourites">
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
        <img :src="getImage(review.review_id)" alt="image">
      </div>

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
</template>

<script>

export default {
  name: "my-reviews",
  async mounted() {
    this.all_reviews = await this.$store.dispatch("addReview");
  },
  data() {
    return {
      all_reviews: [],
    };
  },
};
</script>

<style>
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

.reviews_text {
  max-width: 80%;
  margin: 15px auto;
}

.reviews_text strong {
  color: lightgray;
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

.place-full {
  min-height: 90vh;
}
</style>
