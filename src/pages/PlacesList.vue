<template>
  <div>
    <input-line :tags="tags" @selected="filterOnSelect"></input-line>
    <card-list :places="filteredPlaces"></card-list>
  </div>
</template>

<script>
import { getPlaces } from "@/api/methods";
export default {
  name: "main-page",
  data() {
    return {
      filteredTags: [],
      all_tags: [],
      view_places: [],
      all_places: [],
    };
  },
  mounted() {
    getPlaces().then((res) => {
      this.all_places = res.data;
    });
  },
  methods: {
    filterOnSelect(tagsList) {
      this.filteredTags = tagsList;
    },
  },

  computed: {
    async tags() {
      const res = await this.places;
      const uniqueTags = {};
      for (const [key, value] of Object.entries(res)) {
        for (const tag of value) {
          if (tag !== '') {
            if (!uniqueTags[tag]) {
              uniqueTags[tag] = [];
            }
            uniqueTags[tag].push(value);
          }
        }
      }
      this.all_tags = Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat()
      return Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat();
    },
    filteredPlaces() {
      if (!this.filteredTags.length) {
        return this.all_places.slice(0, 10);
      } else {
        return this.all_places.filter((place) => {
          const tagsArray = Object.values(place.tags);
          return this.filteredTags.every((tag) => tagsArray.includes(tag));
        }).slice(0, 10);
      }
    },
  }
};
</script>

<script setup>
import InputLine from "@/components/InputLine.vue";
import CardList from "@/components/CardList.vue";

defineProps({
  places: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
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
