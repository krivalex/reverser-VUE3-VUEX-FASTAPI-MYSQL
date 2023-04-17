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
import { allTags, getPlaces } from "@/api/methods.js";

export default {
  beforeMount() {
    allTags().then((res) => {
      console.log(res);
    });
    getPlaces().then((res) => {
      console.log(res);
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
