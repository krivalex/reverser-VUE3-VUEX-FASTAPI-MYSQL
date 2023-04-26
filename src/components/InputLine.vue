<template>
  <div class="main-input">
    <my-chips v-if="data.length !== 0" :list="data" @selected="getSelected"></my-chips>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>
<script>
import MyChips from './MyChips.vue'
import MyInput from '../components/UI/MyInput.vue'
import MyButton from '../components/UI/MyButton.vue'

export default {
  name: 'input-line',
  props: ['tags'],
  components: {
    MyChips,
    MyInput,
    MyButton,
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
