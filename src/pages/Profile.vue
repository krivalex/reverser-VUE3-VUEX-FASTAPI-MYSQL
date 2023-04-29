<template>
  <section id="profile">
    <div class="profile-label">
      <h1>Мой профиль</h1>
      <i class="fa fa-edit"></i>
    </div>

    <div class="profile-header">
      <div class="image-status">
        <div class="profile-image">
          <div class="image-label">
            <img :src="this.avatar" alt="profile_img" />
          </div>
        </div>

        <form enctype="multipart/form-data">
          <my-input v-model="avatar" name="file" type="file" accept=".jpg, .png" @input="imagesInput"></my-input>
        </form>

        <button @click="uploadImage">Загрузить</button>

        <div class="profile-status">
          <h1>{{ this.username }}</h1>
          <h2>{{ this.status }}</h2>
        </div>
      </div>

      <div class="status-container">
        <div class="status-label">
          <p>{{ this.favourites.length }}</p>
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

    <div class="profile-label" id="favourite">
      <h1>Избранное</h1>
    </div>

    <div class="all">
      {{ this.places }}
      {{ this.favourites }}
      {{ this.all_reviews }}

      <div class="place" v-for="place in this.places" :key="place.place_id">
        <div class="profile-favourites">
          <card-item :place="place" />
        </div>
      </div>
    </div>

    <div class="zaglushka"></div>

  </section>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import { getUserByID, getPlaceByID, uploadAvatarByID, getAvatarByID, getReviewsByUserID, getReviewsCountByUserID } from "@/api/methods";
export default {
  beforeMount() {
    const user_id = localStorage.getItem("user_id");
    getUserByID(user_id).then((res) => {
      this.username = res.data.login;
      this.phone_number = res.data.phone;
      this.coins = res.data.coins;
      this.rewards = res.data.rewards;
      this.status = res.data.status;
      this.favourites = res.data.favourites;
    });

    getReviewsCountByUserID(user_id).then((res) => {
      this.review_count = res.data;
    });

    getReviewsByUserID(user_id).then((res) => {
      this.all_reviews = res.data;
    });


  },
  async mounted() {
    this.favourites.forEach((element) => {
      getPlaceByID(element).then((res) => {
        this.places.push(res.data);
        return this.places;
      });
    });
    console.log(this.places);

    const user_id = localStorage.getItem("user_id");
    getAvatarByID(user_id).then((res) => {
      console.log(res);
      this.avatar = res;
    });
  },

  name: "Profile",
  methods: {
    getPlaces() {
      this.favourites.forEach((element) => {
        getPlaceByID(element).then((res) => {
          this.places.push(res.data);
          return this.places;
        });
      });
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.avatar = binary;
        };
      }
    },
    uploadImage() {
      const avatar_pack = {
        user_id: localStorage.getItem("user_id"),
        file: this.avatar,
      }

      uploadAvatarByID(avatar_pack).then((res) => {
        console.log(res);
      });
    }
  },
  components: {
    CardItem,
  },
  data() {
    return {
      username: "",
      phone_number: "",
      coins: 0,
      rewards: [],
      status: "client",
      avatar: "",
      favourites: [],
      places: [],
      review_count: 0,
      all_reviews: [],
    };
  },
};
</script>

<style scoped>
#profile {
  min-height: 100vh;
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

.profile-favourites {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

#favourite {
  margin-bottom: 20px;
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

  .all {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    flex-direction: row;
  }

  .place {
    margin: 10px;
  }


  .image-status {
    transform: scale(1.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

}
</style>
