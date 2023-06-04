<template>
  <div class="full-review">
    <div class="author-date">
      <div class="reviews-image-h1">
        <img :src="review.avatar" alt="загрузка">
        <h1>{{ review.login }}</h1>
      </div>
      <div class="reviews-item-date">
        <p>{{ dateFormatter }}</p>
      </div>
    </div>
    <div class="review" :style="{ backgroundColor: reviewBackgroundColor }">
      <div class="reviews-item-header">

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
        <p>{{ textFormatter }}</p>
      </div>



      <div class="reviews-like-dislike">
        <div class="reviews-like-dislike-item" id="like-part" @click="plusLikeToReview(review)">
          <i class="marked fa fa-thumbs-up" v-if="review.liked" aria-hidden="true"></i>
          <i class="fa fa-thumbs-up" v-else aria-hidden="true"></i>
          <p>{{ fakeReviewLikes }}</p>
        </div>
        <div class="reviews-like-dislike-item" id="dislike-part" @click="plusDislikeToReview(review)">
          <i class="marked fa fa-thumbs-down" v-if="review.disliked" aria-hidden="true"></i>
          <i class="fa fa-thumbs-down" v-else aria-hidden="true"></i>
          <p>{{ fakeReviewDislikes }}</p>
        </div>
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
  async mounted() {
    if (Number(this.review.likes) > Number(this.review.dislikes)) {
      this.reviewBackgroundColor = '#cdf7eb';
    } else if (Number(this.review.likes) === Number(this.review.dislikes)) {
      this.reviewBackgroundColor = '#fadab6';
    }
    else {
      this.reviewBackgroundColor = '#f4b6b6';
    }
  },
  data() {
    return {
      reviewBackgroundColor: 'white',
    };
  },
  methods: {
    async plusLikeToReview(review) {
      if (review.liked) {
        review.likes -= 1; // Уменьшить счетчик лайков
        const data = {
          review_id: review.review_id,
          user_id: Number(localStorage.getItem('user_id')),
        };
        await this.$store.dispatch('fetchLikes', data);
        review.liked = false; // Установить флаг, чтобы функция могла выполниться повторно
      } else {
        review.likes += 1; // Увеличить счетчик лайков
        const data = {
          review_id: review.review_id,
          user_id: Number(localStorage.getItem('user_id')),
        };
        await this.$store.dispatch('fetchLikes', data);
        review.liked = true; // Установить флаг, чтобы функция не выполнилась повторно
      }
    },

    async plusDislikeToReview(review) {
      if (review.disliked) {
        review.dislikes -= 1; // Уменьшить счетчик дизлайков
        const data = {
          review_id: review.review_id,
          user_id: Number(localStorage.getItem('user_id')),
        };
        await this.$store.dispatch('fetchDislikes', data);
        review.disliked = false; // Установить флаг, чтобы функция могла выполниться повторно
      } else {
        if (review.liked) {
          review.likes -= 1; // Уменьшить счетчик лайков, если пользователь уже поставил лайк
          const likeData = {
            review_id: review.review_id,
            user_id: Number(localStorage.getItem('user_id')),
          };
          await this.$store.dispatch('fetchLikes', likeData);
          review.liked = false; // Сбросить флаг лайка
        }
        review.dislikes += 1; // Увеличить счетчик дизлайков
        const data = {
          review_id: review.review_id,
          user_id: Number(localStorage.getItem('user_id')),
        };
        await this.$store.dispatch('fetchDislikes', data);
        review.disliked = true; // Установить флаг, чтобы функция не выполнилась повторно
      }
    }
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
    textFormatter() {
      const text = this.review.text;
      const words = text.split(' ');
      const formattedWords = words.map(word => {
        if (word.length > 50) {
          const formattedWord = word.replace(/(.{50})(?!$)/g, '$1 ');
          return formattedWord;
        }
        return word;
      });

      const formattedText = formattedWords.join(' ');
      return formattedText;
    },
    fakeReviewLikes() {
      return Number(this.review.likes);
    },
    fakeReviewDislikes() {
      return Number(this.review.dislikes);
    },
  },
};
</script>

<style scoped>
.full-review {
  position: relative;
  margin-top: 40px;
}

.review {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  position: relative;
}

.author-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
}

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
  margin-bottom: 10px;
}

.reviews-item-header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.reviews-item-header-mark {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}

.marks i {
  font-size: 20px;
}

.marks {
  display: flex;
  align-items: flex-end;
}

.reviews-image-h1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 8px;
}

.reviews-image-h1 h1 {
  font-size: 24px;
}

.reviews-image-h1 img {
  width: 45px;
  height: 45px;
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
  font-size: 20px;
  color: gray;
  font-style: italic;
}

.reviews-item-text p {
  max-width: 80%;
  margin-bottom: 10px;
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
  font-size: 30px;
  color: black;
}


.reviews-like-dislike {
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
}

.reviews-like-dislike-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}

.reviews-like-dislike-item p {
  margin-left: 5px;
  font-size: 24px;
}

.marked {
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
