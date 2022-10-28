<template>
  <div class="place-full">
    <h1>working</h1>
  </div>
</template>

<script>
export default {
  name: 'place-id-info',
  props: ['place'],
  mounted() {
    console.log(this.place)
  },
}
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
