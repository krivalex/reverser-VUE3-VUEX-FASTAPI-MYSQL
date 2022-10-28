<template>
  <div>
    <h1 class="agro-label">Чего бы вы хотели?</h1>
    <input-line :tags="tags" @selected="handleSelected"></input-line>
    <card-list :places="filteredTags"></card-list>
  </div>
</template>



<script>
export default {
  name: 'main-page',
  data() {
    return {
      filteredTags: [],
    }
  },
  methods: {
    handleSelected(lst) {
      this.filteredTags = this.places.filter((el) => {
        let res = false
        console.log(el)
        for (let i = 0; i < lst.length; i++) {
          if (
            el.tags
              .flat()
              .map((el) => el.name)
              .includes(lst[i])
          ) {
            res = true
            break
          }
        }
        console.log(res)
        return res
      })
      console.log(this.filteredTags)
    },
  },
  computed: {
    tags() {
      return this.places
        .map((el) => el.tags)
        .flat()
        .map((el) => el.name)
    },
  },
};
</script>

<script setup>
import InputLine from '@/components/InputLine.vue'
import CardList from '@/components/CardList.vue'

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
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #f5f5f5;
  border-radius: 55px;
}
</style>
