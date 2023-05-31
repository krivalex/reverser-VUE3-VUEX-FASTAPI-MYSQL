<template>
  <i class="fa fa-edit" @click="editData"></i>
  <i class="fa fa-trash" @click="deleteData"></i>
  <input v-model="edit_var" @input="editValue">
</template>

<script>
import MyInput from './UI/MyInput.vue';
export default {
  name: "edit-client-modal",
  emits: ['update:edit_var'],
  components: {
    MyInput,
  },
  props: {
    edit_var: {
      type: String,
      required: true,
    },
  },
  methods: {
    editValue(event) {
      this.$emit("update:edit_var", event.target.value);
    },
  },
};
</script>

<style scoped>
</style>
