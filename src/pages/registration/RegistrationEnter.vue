<template>
  <section id="register-enter">
    <div class="split left" @click="redirectClientRegistration">
      <div class="centered">
        <div>
          <img src="@/assets/client.jpg" alt="пользователь">
          <h2>Пользователь приложения</h2>
        </div>
        <p>После прохождения регистрации, вы сможете просматривать больше информации, читать и оставлять отзывы и
          рейтинги,пользоваться личной системой рекомендаций</p>
        <button>Регистрация как "Пользователь"</button>
      </div>
    </div>

    <div class="split right" @click="redirectManagerRegistration">
      <div class="centered">
        <div>
          <img src="@/assets/manager.png" alt="владелец">
          <h2>Владелец или менеджер заведения</h2>
        </div>
        <p>После прохождения регистрации, вы сможете добавить свое заведение, и редактировать любую информацию в нем,
          просматривать и отвечать на отзывы под вашим заведением</p>
        <button>Регистрация как "Владелец"</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "registration-enter",
  components: {},
  methods: {
    redirectClientRegistration() {
      this.$router.push({ name: "client_registration" });
    },
    redirectManagerRegistration() {
      this.$router.push({ name: "manager_registration" });
    },
  },
};
</script>

<style scoped>
#register-enter {
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px)
}

/* Split the screen in half */
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 20px;
}

.right:hover {
  cursor: pointer;
  transform: perspective();
  transition: transform 0.5s ease-in-out;
  transform: scale(1.2) rotate(5deg);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.left:hover {
  cursor: pointer;
  transform: perspective();
  transition: transform 0.5s ease-in-out;
  transform: scale(1.2) rotate(-5deg);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.left:not(:hover) {
  transition: transform 0.5s ease-in-out;
  transform: scale(1) rotate(0deg);
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.right:not(:hover) {
  transition: transform 0.5s ease-in-out;
  transform: scale(1) rotate(0deg);
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Control the left side */
.left {
  left: 0;
  background-color: white;
}

/* Control the right side */
.right {
  right: 0;
  background-color: var(--main-haki-color);
  color: white;
}

/* If you want the content centered horizontally and vertically */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: auto auto;
}

/* Style the image inside the centered container, if needed */
.centered img {
  width: 300px;
  border-radius: 50%;
  object-fit: cover;
}

.centered h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.centered p {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.left button {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: var(--main-haki-color);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.right button {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: white;
  color: var(--main-haki-color);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

@media screen and (max-width: 784px) {
  .split {
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    padding-top: 20px;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .centered {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 60%;
  }

  .centered img {
    width: 200px;
    object-fit: cover;
  }

  .centered h2 {
    font-size: 1.1rem;
    max-width: 50%;
    font-weight: 700;
    margin-bottom: 1rem;
    margin: 10px auto;
  }

  .centered p {
    font-size: 0.7rem;
    padding: 0 10px;
    font-weight: 400;
    max-width: 40%;
    text-align: center;
    margin: 10px auto;
  }

  .left button {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    max-width: 40%;
  }

  .right button {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    max-width: 40%;
  }
}
</style>
