<template>
  <div class="review">
    <div class="reviews-item-header">
      <div class="reviews-image-h1">
        <img :src="review.avatar" alt="загрузка">
        <h1>{{ review.login }}</h1>
      </div>
      <div class="reviews-item-header-mark">
        <div class="marks" v-for="mark in review.mark">
          <i class="fa fa-star highlight" aria-hidden="true"></i>
        </div>
        <div class="marks" v-for="mark in 10 - review.mark">
          <i class="fa fa-star" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="reviews-item-image" v-if="review.image !== null">
      <img :src="review.image" alt="image">
    </div>

    <div class="reviews-item-text">
      <p>{{ review.text }}</p>
    </div>

    <div class="reviews-item-date">
      <p>{{ dateFormatter }}</p>
    </div>

    <div class="reviews-like-dislike">
      <div class="reviews-like-dislike-item" id="like-part" @click="plusLikeToReview(review)">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        <p>{{ fakeReviewLikes }}</p>
      </div>
      <div class="reviews-like-dislike-item" id="dislike-part" @click="plusDislikeToReview(review)">
        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        <p>{{ fakeReviewDislikes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "review-item",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async plusLikeToReview(review) {
      review.likes += 1;
      const data = {
        review_id: review.review_id,
        user_id: Number(localStorage.getItem('user_id')),
      }
      await this.$store.dispatch('fetchLikes', data);
    },
    async plusDislikeToReview(review) {
      review.dislikes += 1;
      const data = {
        review_id: review.review_id,
        user_id: Number(localStorage.getItem('user_id')),
      }
      await this.$store.dispatch('fetchDislikes', data);
    },
  },
  computed: {
    dateFormatter() {
      const date = this.review.date
      let result_date = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10));
      let formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return formatter.format(result_date);
    },
    fakeReviewLikes() {
      return this.$store.state.likes || Number(this.review.likes);
    },
    fakeReviewDislikes() {
      return Number(this.review.dislikes);
    },
  },
};
</script>

<style scoped>
.highlight::before {
  content: "\f005";
  font-family: FontAwesome;
  color: rgb(255, 247, 0);
}


input[type="file" i] {
  margin: 0 auto;
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

.reviews-item-header-mark {
  display: flex;
  flex-direction: row;
  width: 160px;
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
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: gray;
  font-style: italic;
  display: flex;
  justify-content: flex-end;
  margin-left: 15px;
  margin-bottom: 5px;
}

.reviews-item-text p {
  max-width: 80%;
  margin-bottom: 30px;
}

.fa-star {
  color: #f6ff00;
  margin-right: 3px;
  font-size: 20px;
  -webkit-text-stroke: #000000 0.2px;
}

.fa-star {
  color: black;
}

.fa-thumbs-up,
.fa-thumbs-down {
  font-size: 20px;
  color: black;
}


.reviews-like-dislike {
  position: absolute;
  right: 20px;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  padding: 5px;
}

.reviews-like-dislike-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5px 15px;
  border-radius: 40%;
  margin-right: 5px;
}

#like-part {
  background-color: #bffaa4;
}

#dislike-part {
  background-color: #fab2a4
}

.fa-thumbs-up:hover,
.fa-thumbs-down:hover {
  color: blue;
}

.reviews-item-image img {
  width: 100%;
  height: 100%;
  max-width: 720px;
  max-height: 720px;
  object-fit: cover;
}

@media screen and (min-width: 768px) {

  .marks i {
    font-size: 22px;
  }

  .reviews-image-h1 h1 {
    font-size: 22px;
    margin-left: 15px;
  }

  .reviews-image-h1 img {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .reviews-item-date p {
    font-size: 15px;
  }

  .reviews-item-date {
    margin-top: 20px;
  }
}
</style>
