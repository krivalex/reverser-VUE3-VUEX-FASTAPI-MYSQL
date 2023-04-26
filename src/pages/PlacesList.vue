<template>
  <div>
    <input-line :tags="tags" @selected="filterOnSelect"></input-line>
    <card-list :places="view_places.slice(0, 4)"></card-list>
  </div>
</template>

<script>
import { getPlaces } from "@/api/methods";
export default {
  name: "main-page",
  data() {
    return {
      filteredTags: [],
      data: [],
      view_places: [],
    };
  },
  mounted() {
    getPlaces().then((res) => {
      this.view_places = res.data;
    });
  },
  methods: {
    filterOnSelect(tagsList) {
      const places = this.data;
      this.filteredTags = tagsList;

      this.view_places = places.filter((place) => {
        const tagsArray = Object.values(place.tags);
        return tagsArray.every((tag) => this.filteredTags.includes(tag));
      });
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
      this.data = Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat()
      return Object.values(uniqueTags).reduce((acc, val) => acc.concat(val)).flat();
    }
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
