<template>
  <div class="place">
    <img :src="place.image_url" alt="place" />
    <h2>{{ place.name }}</h2>
    <div class="place-info">
      <div>
        <p class="place-category">
          {{ place.category }}, {{ place.subcategory }}
        </p>
        <p class="place-address">{{ place.geometry_name }}</p>
      </div>
      <div class="place-marks">
        <p class="like"><i class="fa fa-heart" aria-hidden="true"></i></p>
        <p class="dislike">
          <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        </p>
      </div>
    </div>
    <router-link :to="`/place/${place.id}`"> Подробнее </router-link>
  </div>
</template>

<script>
export default {
  name: "card-item",
  props: ["place"],
  mounted() {},
};
</script>

<style>
.place {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
}

.place img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid gray;
}

.place h2 {
  margin: 10px 0;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 0 5px;
}

.place p {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 0 5px;
}

.place-category {
  color: #526471;
  font-style: italic;
}

.place-marks {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.place-marks p {
  display: flex;
  flex-direction: row;
  font-size: 30px;
}

.like:hover {
  color: #ff0000;
  margin-bottom: 5px;
}

.dislike:hover {
  color: #ff0000;
  margin-bottom: 5px;
}

.place-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}
</style>
