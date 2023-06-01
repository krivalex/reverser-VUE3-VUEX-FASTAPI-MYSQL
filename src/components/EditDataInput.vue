<template>
  <div class="edit-data-container">
    <i class="fa fa-trash" @click="deleteData"></i>
    <my-input v-model.lazy="this.new_edit_var" class="custom-search" @input="editValue" placeholder="Ваш новый логин" />
  </div>
</template>

<script>
import { createToast, clearToasts } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import MyInput from './UI/MyInput.vue';
export default {
  name: "edit-client-modal",
  emits: ['update:edit_var'],
  components: {
    MyInput,
  },
  props: {
    edit_var: {
      type: [String],
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
      clearToasts();

    },
    deleteData() {
      this.$emit("update:edit_var", '');
      this.new_edit_var = '';
    },
  }
};
</script>

<style scoped>
.edit-data-container {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}

.edit-data-container i {
  position: absolute;
  right: 5%;
  top: 44%;
  font-size: 20px;
  color: #ff0000;
  cursor: pointer;
}
</style>
