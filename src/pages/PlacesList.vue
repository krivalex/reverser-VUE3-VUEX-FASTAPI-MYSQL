<template>
  <div>
    <h1 class="agro-label">Чего бы вы хотели?</h1>
    <input-line :tags="tags" @selected="filterOnSelect"></input-line>
    <card-list :places="filteredTags"></card-list>
  </div>
</template>

<script>
export default {
  name: "main-page",
  data() {
    return {
      filteredTags: [],
    };
  },
  methods: {
    filterOnSelect(tagsList) {
      // Asatulla was here
      this.filteredTags = this.places.filter((place) => {
        const placeTags = place.tags.map((tag) => tag.name);
        return tagsList.every((tag) => placeTags.includes(tag));
      });
    },
  },
  computed: {
    tags() {
      return this.places
        .map((el) => el.tags)
        .flat()
        .map((el) => el.name);
    },
  },
};
</script>

<script setup>
import InputLine from "@/components/InputLine.vue";
import CardList from "@/components/CardList.vue";

defineProps({
  places: {
    type: Array,
    required: true,
  },
});
</script>

<style>
.agro-label {
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0;
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #f5f5f5;
  border-radius: 55px;
}
</style>
