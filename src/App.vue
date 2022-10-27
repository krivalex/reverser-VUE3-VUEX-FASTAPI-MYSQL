<template>
  <div class="app">
    <h1>It's working</h1>
    <main-page :places="data"></main-page>
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue'
import data from "@/data"
export default {
  components: {
    MainPage
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding: 20px;
}
</style>
