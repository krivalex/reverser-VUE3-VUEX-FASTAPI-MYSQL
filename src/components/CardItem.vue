<template>
  <div class="place">
    <div class="place-image">
      <span>Короткое описание</span>
      <img :src="place.images[0]" alt="place" @click="routeToPlace" />
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
export default {
  name: "card-item",
  props: ["place"],
  data() {
    return {
      place: this.place
    };
  },
  mounted() { },
  methods: {
    routeToPlace() {
      this.$router.push(`/place/${this.place.id}`);
    }
  }
};
</script>

<style>
.place {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border-radius: 10px;
  background-color: white;
  width: 380px;
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
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}


.place-info-marks {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 5px;
}

.place-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
</style>
