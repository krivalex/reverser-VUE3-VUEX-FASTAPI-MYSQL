<template>
  <div>
    <h3 class="temp">alpha version 3.0.2</h3>
    <places-list v-if="places.length" :places="places" />
    <empty-page v-else title="Пока тут пусто" />
  </div>
</template>
<script>
import { data } from "@/data";
import PlacesList from "@/pages/PlacesList.vue";
import EmptyPage from "@/pages/EmptyPage.vue";

export default {
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
