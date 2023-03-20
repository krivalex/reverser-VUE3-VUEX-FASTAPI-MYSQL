<template>
  <div>
    <h3 class="temp">alpha version 2.4.9</h3>
    <places-list v-if="places.length" :places="places" />
    <places-emty v-else title="Пока тут пусто" />
  </div>
</template>
<script>
import { data } from "@/data";
import PlacesList from "@/pages/PlacesList.vue";

export default {
  data() {
    return {
      places: data,
    };
  },
  components: {
    PlacesList,
  },
};
</script>
