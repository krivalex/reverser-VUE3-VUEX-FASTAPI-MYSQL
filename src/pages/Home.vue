<template>
  <div id="container">
    <h3 class="temp">alpha version 7.9.2</h3>
    <places-list v-if="places.length" :places="places" />
    <empty-page v-else title="Пока тут пусто" />
  </div>
</template>
<script>
import { data } from "@/data";
import PlacesList from "@/pages/PlacesList.vue";
import EmptyPage from "@/pages/EmptyPage.vue";
import axios from "axios";

export default {
  beforeMount() {
    const response = {}

    axios
      .get("http://localhost:8000/tags")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      places: data,
    };
  },
  components: {
    PlacesList,
    EmptyPage,
  },
};
</script>
