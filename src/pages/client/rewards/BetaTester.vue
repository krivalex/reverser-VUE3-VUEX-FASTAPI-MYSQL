<template>
  <div class="reward-container">
    <div class="reward-image">
      <img src="@/assets/rewards/beta-test.png" alt="reward_img" />
    </div>
    <div class="reward-status">
      <h1>Бета-тестер</h1>
      <h2>Пользовался приложением, еще до того как оно стало популярным</h2>
      <h6>Редкость: Мифическая</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "beta-tester",
};
</script>

<style scoped>
.reward-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160px;
  background-color: azure;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.reward-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
  text-align: center;
}

.reward-image img {
  width: 100%;
  height: 100%;
}

.reward-status {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}

.reward-status h1 {
  font-size: 30px;
  text-shadow: 1px 1px 1px #ffffff;
}

.reward-status h2 {
  font-size: 15px;
  text-align: center;
}

.reward-status h6 {
  font-size: 15px;
  font-style: italic;
  color: gray;
}
</style>
