<template>
  <section id="profile" v-if="user">
    <div class="profile-label">
      <h1>Мой профиль</h1>
      <i class="fa fa-edit" @click="showModel"></i>
    </div>

    <edit-client-modal-vue v-if="model" v-model="model" :model="model" :user="user"
      @update:model="showModel"></edit-client-modal-vue>

    <div class="profile-header">
      <div class="image-status">
        <div class="profile-image">
          <div class="image-label">
            <img :src="avatar" alt="profile_img" />
          </div>
        </div>
        <div class="profile-status">
          <h1>{{ user.login }}</h1>
          <h2>Пользователь</h2>
        </div>
      </div>
    </div>

    <div class="status-container">
      <div class="status-label">
        <p>{{ this.likesCount }}</p>
        <i class="fa fa-heart" id="star"></i>
      </div>
      <div class="status-label">
        <p>{{ this.reviewCount }}</p>
        <i class="fa fa-comments" id="check"></i>
      </div>
      <div class="status-label">
        <p>1</p>
        <i class="fa fa-trophy" id="trophy"></i>
      </div>
    </div>

    <div class="all-rewards">
      <beta-tester></beta-tester>
    </div>

  </section>
  <div v-else>
    <my-loader></my-loader>
  </div>
</template>

<script>
import BetaTester from "./rewards/BetaTester.vue";
import EditClientModalVue from "@/components/EditClientModal.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
import { getReviewsCountByUserID } from "@/api/methods";
export default {
  name: "client-profile",
  components: {
    BetaTester,
    EditClientModalVue,
    MyLoader,
  },
  async mounted() {
    const user_id = Number(localStorage.getItem("user_id"));
    await this.$store.dispatch("fetchUserInfo", user_id);

    getReviewsCountByUserID(this.$store.state.user_id).then((res) => {
      this.review_count = res;
    });

    await this.$store.dispatch("fetchAvatar", this.$store.state.user_id);
  },

  async updated() {
    await this.$store.dispatch("fetchUserInfo", this.$store.state.user_id);
  },


  methods: {
    showModel() {
      this.model = !this.model;
      this.$emit("update:model", this.model);
    }
  },

  data() {
    return {
      review_count: 0,
      model: false,
    };
  },
  computed: {
    likesCount() {
      return Object.keys(this.favourites).length;
    },
    reviewCount() {
      return this.review_count;
    },
    user() {
      return this.$store.state.user_info;
    },
    favourites() {
      if (this.$store.state.user_info.favourites == null) {
        return 0;
      }
      else
        if (Object.keys(this.$store.state.user_info.favourites).length === 0) {
          return 0;
        }
        else {
          return JSON.parse(this.$store.state.user_info.favourites);
        }
    },
    avatar() {
      if (this.$store.state.avatar === null) {
        return require("@/assets/default-avatar.png");
      }
      return this.$store.state.avatar;
    }
  }
};
</script>

<style scoped>
#profile {
  width: 100vw;
  height: calc(100% + 60px);
  margin: auto auto;
}

.profile-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}

.profile-label h1 {
  font-size: 30px;
  padding: 5px 20px;
  margin: 0;
  margin-right: 10px;
  background-color: var(--main-haki-color);
  color: white;
  border-radius: 10px;
}

.profile-label i {
  font-size: 30px;
  margin: 0;
}

.image-label img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  object-fit: cover;
}

.profile-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
}

.profile-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
}

.profile-status h1 {
  font-size: 50px;
  text-shadow: 1px 1px 1px #ffffff;
}

.profile-status h2 {
  font-size: 20px;
  font-style: italic;
  color: gray;
}

.status-label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px 10px;
}

.status-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}

.status-label p {
  font-size: 30px;
  margin: 0;
  margin-right: 5px;
}

.status-label i {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
  margin: 0;
  text-shadow: 1px 1px 1px #000;
  margin-bottom: 5px;
}

#star {
  color: #DC143C;
}

#check {
  color: #00FF00;
}

#trophy {
  color: #FFD700;
}

#dollar {
  color: #00f2ff;
}


.profile-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  height: 350px;
  position: relative;
}

.image-status {
  height: 100%;
}


@media screen and (min-width: 768px) {
  .status-container {
    transform: scale(2);
    transform-origin: top right;
  }

  .place {
    margin: 10px;
    max-width: 80%;
  }

  .image-status {
    transform: scale(1.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}


.add_reviews {
  background-color: #DC143C;
  color: white;
  position: relative;
  max-width: 60vw;
}

.close-button {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 105%;
  right: -30%;
  cursor: pointer;
  z-index: 1000;
}


.review-desc {
  font-size: 15px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
}

.add_action {
  margin: 0 auto;
  margin-top: 30px;
}

.add_action input {
  margin: 0 auto;
}

input[type="file" i] {
  margin: 0 auto;
}

.skip_button {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  font-size: 20px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  border: 0px;
  background-color: gray;
}

#mark {
  margin-bottom: 10px;
}

.fa-edit {
  z-index: 1000;
  color: black;
}
</style>
