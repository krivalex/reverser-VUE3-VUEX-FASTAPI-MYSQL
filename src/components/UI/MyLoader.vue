<template>
  <div class="loading_big">
    <fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>
  </div>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
  name: 'my-loader',
  components: {
    FadeLoader
  },
  data() {
    return {
      color: 'var(--main-haki-color)',
      height: '15px',
      width: '5px',
      loading: true
    }
  },
}
</script>

<style>
.loading_big {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(2);
}

.loading_small {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(2);
}
</style>
