<template>
  <div>
    <i class="fa fa-edit" @click="editData"></i>
    <i class="fa fa-trash" @click="deleteData"></i>
    <my-input v-model.lazy="this.new_edit_var" @:update:edit_var="editValue" />
  </div>
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
  data() {
    return {
      new_edit_var: this.edit_var,
    }
  },
  methods: {
    editValue() {
      this.$emit("update:edit_var", this.new_edit_var);
    },
  },
};
</script>

<style scoped>
</style>
