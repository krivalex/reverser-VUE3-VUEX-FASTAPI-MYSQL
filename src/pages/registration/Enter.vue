<template>
  <div class="enter">
    <h3 class="me_white">@krivalex</h3>
    <div class="enter-info">
      <h1>Reverser</h1>
      <div class="divider"></div>
      <p>Приложение для поиска и добавления новых мест</p>
    </div>
    <div class="enter-info_more">
      <h2>
        Чтобы просматривать отзывы, добавлять заведения в избранные, и пользоваться рекомендациями,
        вам нужно зарегистрироваться или войти в свой аккаунт
      </h2>
    </div>
    <div class="about-team">
      <my-button @click="formRedirect" class="next_button">
        Оставить отзыв
      </my-button>
      <h3>Made by team <strong>"Reversers"</strong></h3>
    </div>
    <div class="enter-links">
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Enter",
  components: {
    MyButton,
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegistration() {
      this.$router.push("/client_registration");
    },
    formRedirect() {
      window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSdNwis8UBLnGhBEm7HUtQ2637QBCj0YzVEjzDn1B7MoVib65Q/viewform")
    },

  },
};
</script>

<style scoped>
.enter {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DC143C;
  color: white;
  text-align: center;
}

.enter-info {
  margin-bottom: 50px;
}

.enter-info h1 {
  font-size: 50px;
  font-weight: 700;
}

.divider {
  width: 250px;
  height: 5px;
  background-color: white;
  margin: 10px auto;
}

.enter-info p {
  font-size: 20px;
  font-weight: 400;
  max-width: 80vw;
  color: lightgray;
  font-style: italic;
}

.enter-login {
  margin-top: 30px;
}

.enter-button {
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: #D9C5C9;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
}

.enter-info_more {
  padding-top: 50px;
}

.enter-info_more h2 {
  font-size: 20px;
  font-weight: 400;
  max-width: 90vw;
  padding: 20px;
  color: white;
  font-style: italic;
}


#trip2 {
  position: absolute;
  right: 25%;
  bottom: 8%;
  width: 96px;
  height: 80px;
  object-fit: cover;
}

#trip1 {
  position: absolute;
  right: 0%;
  bottom: 8%;
  width: 96px;
  height: 80px;
  object-fit: cover;
}

#trip3 {
  position: absolute;
  left: 0%;
  bottom: 8%;
  width: 96px;
  height: 80px;
  object-fit: cover;
}

.next_button {
  width: 100%;
  height: 50px;
  border-radius: 50px;
  background-color: #D9C5C9;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
}

.about-team {
  margin-top: 150px;
}

.about-team h3 {
  font-size: 20px;
  font-weight: 400;
  max-width: 90vw;
  margin-top: 5px;
  color: white;
  font-style: italic;
}

@media screen and (min-width: 768px) {
  .enter-info h1 {
    font-size: 80px;
  }

  .divider {
    width: 350px;
  }

  .enter-info p {
    font-size: 30px;
  }

  .enter-info_more h2 {
    font-size: 25px;
    width: 75%;
    margin: 0 auto;
  }

  .about-team {
    margin-top: 50px;
  }


  .about-team h3 {
    font-size: 25px;
  }
}
</style>
