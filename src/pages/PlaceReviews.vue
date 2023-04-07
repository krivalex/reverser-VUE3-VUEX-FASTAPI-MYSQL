<template>
  <h1>Тут отзывы для заведения с айди {{ place.id }}</h1>
  <br />
  <h1>Были здесь? Оставить отзыв</h1>
  <br />
  <div class="reviews">
    <div class="reviews_text">
      <label class="label label-description" for="text_reviews">Отзыв </label>
      <my-text-area v-model="reviews_text" name="text_reviews" placeholder="Текст" @input="textInput"></my-text-area>
    </div>
    <div class="reviews_marks">
      <h1 class="label label-description">Оценка </h1>
      <div class="all_reviews_marks_item">
        <div class="reviews_marks_item" v-for="mark in marks" :key="mark" :id="mark">
          <div v-if="mark <= Number(selected) && selected !== 0">
            <input type="radio" class="star" name="rating" :value=mark @click="ratioClick" checked />
            <i class="fa fa-star highlight"></i>
          </div>
          <div v-else>
            <input type="radio" class="star" name="rating" :value=mark @click="ratioClick" />
            <i class="non-highlight fa fa-star "></i>
          </div>
        </div>
      </div>
    </div>

  </div>
  <br />
  <br />
  <br />
  <h1>Отзывы о заведении</h1>
  <div ref="reviews" class="reviews__list">
    <div v-for="review in place.reviews" :key="review.id" class="reviews__item">
      <div class="reviews__item__header">
        <div class="reviews__item__header__name">{{ review.name }}</div>
        <div class="reviews__item__header__date">{{ review.date }}</div>
      </div>
      <div class="reviews__item__text">{{ review.text }}</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { data } from "@/data";
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "place-id-reviews",
  components: {
    'my-text-area': MyTextArea,
  },
  data() {
    const route = useRoute();
    const place = data.find((place) => place.id == route.params.id);

    const marks = [1, 2, 3, 4, 5, 7, 8, 9, 10];

    return {
      place,
      reviews_text: '',
      reviews_mark: 0,
      marks,
      selected: 0,
    };
  },
  methods: {
    textInput(event) {
      console.log(event.target.value);
    },
    ratioClick(event) {
      console.log(event.target.value);
      this.selected = event.target.value;

    },
  },
};
</script>

<style scoped>
.all_reviews_marks_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
}

.reviews_marks_item input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}


.highlight::before {
  content: "\f005";
  font-family: FontAwesome;
  color: rgb(255, 247, 0);
}
</style>
