<template>
    <input :value="modelValue" @input="updateInput" class="input">
</template>
  
<script>
import { createToast, clearToasts } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
            clearToasts();
        }
    }
}
</script>
  
<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>
