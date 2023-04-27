<template>
  <div class="place">
    <div class="place-image">
      <span>Короткое описание</span>
      <img :src="image" alt="place" @click="routeToPlace" />
    </div>

    <div class="place-info-marks">

      <div class="place-info">

        <div class="place-name">
          <h2 @click="routeToPlace">{{ place.name }}</h2>
        </div>

        <div class="place-rating-category">
          <div class="div-place-rating">
            <p class="place-rating">
              <i class="fa fa-star" aria-hidden="true"></i>
            </p>
            <p class="place-rating-value">9.6</p>
          </div>
          <p class="place-category" @click="routeToPlace">
            {{ place.category }}, {{ place.subcategory }}
          </p>
        </div>

      </div>

      <div class="place-marks">
        <p class="like">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { getImageByID } from '@/api/methods';

export default {
  name: "card-item",
  props: ["place"],
  async mounted() {
    this.image = await getImageByID(this.place.place_id);
  },
  methods: {
    routeToPlace() {
      this.$router.push(`/place/${this.place.place_id}`);
    },
  },
  data() {
    return {
      image: 'data:image/jpeg;base64,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'
    };
  },
};
</script>

<style scoped>
.place {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border-radius: 10px;
  background-color: white;
  width: 380px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.place img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  border: 2px solid rgb(0, 0, 0);
}

.like:hover {
  color: #DC143C;
  margin-bottom: 5px;
}


.place-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
}


.place-info-marks {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.place-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 5px;
}

.place-rating-category {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.div-place-rating {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-style: bold;
}

.div-place-rating i {
  color: #DC143C;
  font-size: 20px;
}

.like i {
  margin-top: 5px;
  font-size: 30px;
}

.place-name {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.place-rating-value {
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
}

.place-category {
  font-style: italic;
}

.place-image {
  position: relative;
}

.place-image span {
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  background-color: #f5f5f5;
  border-radius: 55px;
  padding: 5px 10px;
}

@media screen and (min-width: 768px) {
  .place {
    width: 500px;
  }
}
</style>
