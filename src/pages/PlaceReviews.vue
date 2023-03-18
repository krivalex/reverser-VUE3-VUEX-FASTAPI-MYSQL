<template>
  <h1>Тут отзывы для заведения с айди {{ place.id }}</h1>
</template>

<script>
import { useRoute } from "vue-router";
import { data } from "@/data";

export default {
  name: "place-id-reviews",
  data() {
    const route = useRoute();
    const place = data.find((place) => place.id == route.params.id);
    console.log(place.id);
    return {
      place,
    };
  },
};
</script>

<style scoped>
</style>
