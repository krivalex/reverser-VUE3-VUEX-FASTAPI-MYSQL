<template>
  <div class="footer">
    <my-button @click="formRedirect">
      Оставить отзыв</my-button>
    <h3>Made by team <strong>"Reversers"</strong></h3>
  </div>
</template>

<script>
export default {
  name: 'footer-component',
  methods: {
    formRedirect() {
      window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSdNwis8UBLnGhBEm7HUtQ2637QBCj0YzVEjzDn1B7MoVib65Q/viewform")
    },
  },
}
</script>

<style>
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 140px;
  min-width: 100%;
  background-color: #f5f5f5;
  color: white;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 1px 6px #a3bcb9;
  padding-top: 10px;

}

.footer h3 {
  font-size: 15px;
  font-weight: 400;
  color: #526471;
  font-style: italic;
  margin-top: 10px;
}
</style>
