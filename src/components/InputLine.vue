<template>
  <div class="main-input">
    <my-chips v-if="data.length !== 0" :list="data" @selected="getSelected"></my-chips>
    <div v-else>
      <my-loader />
    </div>
  </div>
</template>
<script>
import MyChips from '@/components/MyChips.vue'
import MyLoader from '@/components/UI/MyLoader.vue'

export default {
  name: 'input-line',
  props: ['tags'],
  components: {
    MyChips,
    MyLoader
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
    }
  },
}
</script>
