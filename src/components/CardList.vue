<template>
  <div v-if="places && places.length > 0" class="card-list">
    <card-item v-for="p in places" :key="p.place_id" :place="p" />
  </div>
</template>

<script>
import CardItem from './CardItem.vue'
export default {
  name: 'card-list',
  props: {
    places: {
      type: Array,
      required: true,
    },
  },
  components: {
    CardItem,
  },
}
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  padding-top: 10px;
  min-height: 300px;
}
</style>
