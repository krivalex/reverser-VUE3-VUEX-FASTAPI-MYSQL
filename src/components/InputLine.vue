<template>
  <div class="main-input">
    <Chips :list="tags" @selected="getSelected"></Chips>
  </div>
</template>
<script>
import Chips from '../components/Chips.vue'
export default {
  props: ['tags'],
  components: { Chips },
  methods: {
    getSelected(lst) {
      this.$emit('selected', lst)
    },
  },
  emits: ['selected'],
}
</script>
