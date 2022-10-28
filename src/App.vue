<template>
  <div class="wrapper">
    <header class="header">
      <header-component />
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <footer-component />
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/layouts/Header.vue";
import FooterComponent from "./components/layouts/Footer.vue";

export default {
  name: "App vue",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
/* sticky footer */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
</style>
