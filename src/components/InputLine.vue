<template>
  <div class="main-input">
    <my-chips :list="tags" @selected="getSelected"></my-chips>
  </div>
</template>
<script>
import MyChips from './MyChips.vue'
import MyInput from '../components/UI/MyInput.vue'
import MyButton from '../components/UI/MyButton.vue'

export default {
  props: ['tags'],
  components: {
    MyChips,
    MyInput,
    MyButton,
  },
  methods: {
    getSelected(lst) {
      this.$emit('selected', lst)
    },
  },
  emits: ['selected'],
  data() {
    return {
      selected: [],
    }
  },
}
</script>
