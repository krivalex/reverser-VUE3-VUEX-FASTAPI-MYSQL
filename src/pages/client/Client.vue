<template>
  <section id="profile">
    <div class="profile-label">
      <h1>Мой профиль</h1>
      <i class="fa fa-edit" @click="showModel"></i>
    </div>

    <my-modal v-model:show="model">
      <div class="add_reviews">
        <img class="close-button" src="@/assets/close.png" @click="showModel" alt="close" />

        <div class="reviews">

          <div class="reviews_text">
            <h1 class="review-desc">Ваш email:</h1>
            <h1 class="review-desc"><strong>{{ this.email }}</strong></h1>
          </div>


          <div class="reviews_text">
            <h1 class="review-desc">Загрузить аватар:</h1>
          </div>

          <form enctype="multipart/form-data">
            <my-input v-model="avatar_new" name="file" type="file" accept=".jpg, .png" @input="imagesInput"></my-input>
          </form>

          <div class="add_action">
            <button @click="uploadImage" class="skip_button">Обновить профиль</button>
          </div>

        </div>

      </div>

    </my-modal>

    <div class="profile-header">
      <div class="image-status">
        <div class="profile-image">
          <div class="image-label">
            <img :src="this.avatar" alt="profile_img" />
          </div>
        </div>



        <div class="profile-status">
          <h1>{{ this.username }}</h1>
          <h2>{{ this.status }}</h2>
        </div>
      </div>

      <div class="status-container">
        <div class="status-label">
          <p>{{ this.likesCount }}</p>
          <i class="fa fa-heart" id="star"></i>
        </div>
        <div class="status-label">
          <p>{{ this.review_count }}</p>
          <i class="fa fa-check" id="check"></i>
        </div>
        <div class="status-label">
          <p>{{ this.rewards }}</p>
          <i class="fa fa-trophy" id="trophy"></i>
        </div>
        <div class="status-label">
          <p>{{ this.coins }}</p>
          <i class="fa fa-dollar" id="dollar"></i>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyTextArea from "@/components/UI/MyTextArea.vue";
import MyModal from "@/components/UI/MyModal.vue";
import CardItem from "@/components/CardItem.vue";
import { getUserByID, getPlaceByID, uploadAvatarByID, getAvatarByID, getReviewsByUserID, getReviewsCountByUserID, getImageReviewByID, getImageByID } from "@/api/methods";
export default {
  created() {
    let user_id = Number(localStorage.getItem("user_id"));
    console.log(user_id);
    getUserByID(user_id).then((res) => {
      console.log(res);
      this.username = res.data.login;
      this.phone_number = res.data.phone;
      this.coins = res.data.coins;
      this.rewards = res.data.rewards;
      this.status = res.data.status;
      this.places = [];
      this.email = res.data.email;
      this.favourites = JSON.parse(res.data.favourites);
    });




    getReviewsCountByUserID(user_id).then((res) => {
      this.review_count = res;
    });

    console.log(user_id);
    getAvatarByID(user_id).then((res) => {
      if (res != "Image not found") {
        this.avatar = res;
      }
    });


  },

  name: "Profile",
  methods: {
    showModel() {
      this.model = !this.model;
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.avatar_new = binary;
        };
      }
    },
    uploadImage() {
      const avatar_pack = {
        user_id: Number(localStorage.getItem("user_id")),
        file: this.avatar_new,
      }

      uploadAvatarByID(avatar_pack).then((res) => {
        console.log(res);
      });

      this.showModel()
    }
  },
  components: {
    CardItem,
    MyInput,
    MyTextArea,
    MyModal,
  },
  data() {
    return {
      username: "",
      phone_number: "",
      coins: 0,
      rewards: [],
      status: "client",
      avatar: "",
      avatar_new: "",
      favourites: {},
      places: [],
      review_count: 0,
      all_reviews: [],
      all_reviews_image: [],
      model: false,
      email: "",
    };
  },
  computed: {
    likesCount() {
      return this.favourites.length;
    },
  }
};
</script>

<style scoped>
#profile {
  width: 100%;
  margin: 10px;
  margin: 0 auto;
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
  background-color: #DC143C;
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
  background-color: #ffffff;
  border-radius: 10px;
}

.status-container {
  position: absolute;
  top: 40%;
  right: 0;
  transform: translate(0, -50%);
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.status-label p {
  font-size: 20px;
  margin: 0;
  margin-right: 5px;
}

.status-label i {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
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
  height: 400px;
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
}
</style>
