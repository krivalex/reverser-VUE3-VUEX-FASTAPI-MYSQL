<template>
  <div id="container">
    <div v-if="places">
      <h3 class="temp">alpha version 7.9.2</h3>
      <places-list :places="places" />
    </div>
    <div v-else>
      Loading...
    </div>

  </div>
</template>
<script>
import PlacesList from "@/pages/PlacesList.vue";
import EmptyPage from "@/pages/EmptyPage.vue";
import { allTags, getPlaces } from "@/api/methods.js";

export default {
  data() {
    return {
      places: allTags().then(
        (res) => {
          const data = res.data.tags;
          return data;
        },
        (err) => {
          console.log(err);
        }
      )
    };
  },
  components: {
    PlacesList,
    EmptyPage,
  },
};
</script>
