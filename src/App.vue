<template>
  <div class="app">
    <h1>It's working</h1>
    <div v-if="places && places.length > 0">
      <main-page :places="places"></main-page>
    </div>
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue'
import { data } from '@/data'
export default {
  data() {
    return {
      places: [],
    }
  },
  mounted() {
    this.places = data
  },
  components: {
    MainPage,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
