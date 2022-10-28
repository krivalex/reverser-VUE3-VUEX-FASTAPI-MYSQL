<template>
  <div v-if="places && places.length > 0" class="card-list">
    <card-item v-for="p in places" :place="p" />
  </div>
  <h2 class="places-if-not-tags" v-else>⬆Укажите выше теги⬆</h2>
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

<style>
.card-list {
  display: flex;
  flex-direction: column;
}

.places-if-not-tags {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  background-color: #f5f5f5;
  border-radius: 55px;
}
</style>
