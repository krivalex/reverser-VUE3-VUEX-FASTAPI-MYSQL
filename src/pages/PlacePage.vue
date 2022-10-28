<template>
  <div class="place-full">
    <h1>working</h1>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "place-id-info",
  setup() {
    const route = useRoute();

    console.log(route.params.id);
  },
};
</script>

<style>
.place-full {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
}
</style>
