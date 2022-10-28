<template>
  <div class="app">
    <h3 class="temp">alpha version 1.1.4</h3>
    <header-component />
    <div v-if="places && places.length > 0">
      <main-page :places="places"></main-page>
    </div>
    <footer-component />
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue'
import HeaderComponent from '@/components/layouts/Header.vue'
import FooterComponent from './components/layouts/Footer.vue'
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
    HeaderComponent,
    FooterComponent
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
  background-color: rgb(209, 234, 221);
}

.temp {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  color: #526471;
  font-style: italic;
}
</style>
