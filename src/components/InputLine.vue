<template>
  <div class="main-input">
    <Chips :list="tags" @selected="getSelected"></Chips>
  </div>
</template>
<script>
import Chips from '../components/Chips.vue'
import MyInput from '../components/UI/MyInput.vue'
import MyButton from '../components/UI/MyButton.vue'

export default {
  props: ['tags'],
  components: {
    Chips,
    MyInput,
    MyButton,
  },
  methods: {
    getSelected(lst) {
      this.$emit('selected', lst)
    },
  },
  emits: ['selected'],
}
</script>
