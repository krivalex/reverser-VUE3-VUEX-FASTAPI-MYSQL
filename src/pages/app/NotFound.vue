<template>
  <section id="not-found">
    <div class="found-label">
      <h1>Такой страницы не существует</h1>
    </div>
    <button class="next_button" @click="redirectHome">
      Вернуться на главную
    </button>
    <div class="zaglushka"></div>
  </section>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NotFound",
  setup() {
    const router = useRouter();
    const redirectHome = () => {
      router.push("/");
    };
    return {
      redirectHome,
    };
  },
};
</script>

<style scoped>
#not-found {
  background-color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-center;
  text-align: center;
  color: #000000;
  background-image: url('@/assets/b.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.found-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}

.found-label h1 {
  font-size: 30px;
  padding: 5px 20px;
  margin: 0;
  margin-right: 10px;
  background-color: #DC143C;
  color: white;
  border-radius: 10px;
  margin-bottom: 50px;
}

.next_button {
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: #D9C5C9;
  color: black;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
}

.next_button:hover {
  background-color: #DC143C;
  color: white;
  cursor: pointer;
}
</style>
