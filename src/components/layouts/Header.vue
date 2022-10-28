<template>
  <div class="header">
    <img class="logo" src="@/assets/reverse-travelling.png" alt="logo" />
    <h1>Reverser</h1>
    <img class="user" src="@/assets/user.png" alt="user" />
  </div>
</template>

<script>
export default {
  name: 'header-component',
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  box-shadow: 0px 1px 6px #a3bcb9;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.user {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
}

.header h1 {
  font-size: 30px;
  font-weight: 700;
  color: teal;
  font-family: 'Roboto', sans-serif;
}
</style>
