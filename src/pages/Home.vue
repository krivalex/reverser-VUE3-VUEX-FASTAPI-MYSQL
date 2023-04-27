<template>
  <div id="container">
    <div v-if="places">
      <h3 class="temp">beta version 1.9.2</h3>
      <h3 class="me">@krivalex</h3>
      <places-list :places="places" />
    </div>
    <div v-else>
      Loading...
    </div>

    <div class="zaglushka">

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

<style scoped>
@media screen and (min-width: 768px) {
  #container {
    padding: 0 30px;
  }

  .temp {
    font-size: larger;
  }

}
</style>
