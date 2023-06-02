<template>
  <section id="quit">
    <div class="info">
      <h1 class="quit-label">Вы уверены что хотите выйти из аккаунта?</h1>
      <p class="session">Текущие сессии:</p>
    </div>
    <div class="user_card">
      <div class="user_card__avatar">
        <img :src="avatar" alt="avatar" />
      </div>
      <div class="user_card__info">
        <div class="user_card__info__name">
          <h2>{{ user.login }}</h2>
        </div>
        <div class="user_card__info__email">
          <h3>{{ user.email }}</h3>
        </div>
      </div>
      <div class="actions">
        <button class="yes" @click="quit">
          Выйти
        </button>
        <button class="no" @click="cancel">
          Отмена
        </button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "quit-page",
  async mounted() {
    const user_id = Number(localStorage.getItem("user_id"));
    await this.$store.dispatch("fetchUserInfo", user_id);
    await this.$store.dispatch("fetchAvatar", this.$store.state.user_id);
  },
  computed: {
    user() {
      return this.$store.state.user_info;
    },
    avatar() {
      return this.$store.state.avatar;
    },
  },
  methods: {
    quit() {
      localStorage.clear();
      this.$router.push("/login");
    },
    cancel() {
      this.$router.go(-1);
    }
  },
}
</script>

<style scoped>
#quit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.quit-label {
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  background-color: black;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
}

.user_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 420px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.user_card__avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

.user_card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  margin-bottom: 50px;
  margin-top: 100px;
}

.session {
  font-size: 30px;
  margin: 0 auto;
  margin-top: 20px;
  color: rgb(74, 74, 74);
}

.user_card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user_card__info__name {
  font-size: 30px;
  margin: 0 auto;
  color: rgb(74, 74, 74);
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.actions button {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 20px;
  margin: 0 10px;
}

.yes {
  background-color: #DC143C;
  color: #fff;
}

.no {
  background-color: #000000;
  color: white;
}
</style>
