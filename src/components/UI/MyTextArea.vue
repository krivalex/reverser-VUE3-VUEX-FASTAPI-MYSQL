<template>
  <textarea :value="modelValue" @input="updateInput" class="textarea"></textarea>
</template>

<script>
export default {
  name: 'my-text-area',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.textarea {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
