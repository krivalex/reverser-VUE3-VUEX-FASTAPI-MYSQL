<template>
  <div class="place">
    <img :src="place.image_url" alt="place" />
    <h2>{{ place.name }}</h2>
    <p>{{ place.category }}</p>
    <my-button @click="$router.push(`/place/${place.id}`)"> Подробнее </my-button>
  </div>
</template>

<script>
export default {
  name: 'card-item',
  props: ['place'],
  mounted() {
    console.log(this.place)
  },
}
</script>

<style>
.place {
  display: flex;
  flex-direction: column;
}
</style>
