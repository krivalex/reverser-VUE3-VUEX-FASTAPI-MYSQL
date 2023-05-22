<template>
  <div class="main-input">
    <my-chips v-if="data.length !== 0" :list="data" @selected="getSelected"></my-chips>
    <div v-else class="loading_big">
      <fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>
    </div>
  </div>
</template>
<script>
import MyChips from './MyChips.vue'
import MyInput from '../components/UI/MyInput.vue'
import MyButton from '../components/UI/MyButton.vue'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
  name: 'input-line',
  props: ['tags'],
  components: {
    MyChips,
    MyInput,
    MyButton,
    FadeLoader
  },
  async mounted() {
    this.data = await this.tags
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
      data: [],
      color: 'var(--main-haki-color)',
      height: '15px',
      width: '5px',
    }
  },
}
</script>
