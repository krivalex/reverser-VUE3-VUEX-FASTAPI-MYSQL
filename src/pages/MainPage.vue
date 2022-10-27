<template>
  <div>
    <h1>Страница поиска (ALPHA)</h1>
    <input-line :tags="tags" @selected="handleSelected"></input-line>
    <card-list :places="filteredTags"></card-list>
  </div>
</template>

<script>
import InputLine from '@/components/InputLine.vue'
import CardList from '@/components/CardList.vue'
export default {
  components: {
    InputLine,
    CardList,
  },
  name: 'main-page',
  props: {
    places: {
      type: Array,
      required: true,
    },
  },
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
      // console.log(this.filteredTags)
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
}
</script>

<style></style>
