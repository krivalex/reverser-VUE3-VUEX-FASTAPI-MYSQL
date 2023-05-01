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
            <h1 class="review-desc">{{ this.email }}</h1>
          </div>


          <form enctype="multipart/form-data">
            <my-input v-model="avatar" name="file" type="file" accept=".jpg, .png" @input="imagesInput"></my-input>
          </form>

          <div class="add_action">
            <button @click="uploadImage" class="skip_button">Обновить</button>
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

      <div class="place" v-for="place in this.places" :key="place.place_id">
        <div class="profile-favourites">
          <card-item :place="place" />
        </div>
      </div>

      <!-- <div class="place" v-for="review in this.all_reviews" :key="review.review_id">
        <div class="profile-favourites">
          <div class="reviews-item-header">
            <div class="reviews-image-h1">
              <img :src="review.avatar" alt="загрузка">
              <h1>{{ review.username }}</h1>
            </div>
            <div class="reviews-item-header-mark">
              <div class="marks" v-for="mark in review.mark">
                <i class="gold fa fa-star" aria-hidden="true"></i>
              </div>
              <div class="marks" v-for="mark in 10 - review.mark">
                <i class="fa fa-star" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div class="reviews-item-image">
            <img :src="getImage(review.review_id)" alt="image">
          </div>

          <div class="reviews-item-text">
            <p>{{ review.text }}</p>
          </div>

          <div class="reviews-item-date">
            <p>{{ review.date.slice(0, 10) }}</p>
            <p>/</p>
            <p>{{ review.date.slice(11) }}</p>
          </div>
        </div>
      </div> -->

    </div>

    <div class="zaglushka"></div>

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
    const user_id = localStorage.getItem("user_id");
    getUserByID(user_id).then((res) => {
      this.username = res.data.login;
      this.phone_number = res.data.phone;
      this.coins = res.data.coins;
      this.rewards = res.data.rewards;
      this.status = res.data.status;
      this.favourites = res.data.favourites;
      this.places = [];
      this.email = res.data.email;

      console.log(this.favourites);

      Promise.all(
        this.favourites.map((element) => {
          return getPlaceByID(element);
        })
      ).then(places => {
        this.places = places.map(place => place.data)
      }).catch(error => {
        console.log(error);
      });

    });

    getReviewsCountByUserID(user_id).then((res) => {
      this.review_count = res;
    });

    getReviewsByUserID(user_id).then((res) => {
      this.all_reviews = res;
    });

    getAvatarByID(user_id).then((res) => {
      this.avatar = res;
    });


  },
  async mounted() {
    const route = this.$route;
    this.images = await getImageByID(route.params.id);

    getImageReviewByID(route.params.id)
      .then((response) => {
        this.all_reviews_image = response;
      })
      .catch((error) => {
        console.log(error);
      });

    for (let i = 0; i < this.reviews.length; i++) {
      console.log(this.reviews[i].user_id);
      const data = await getUserByID(this.reviews[i].user_id);
      console.log(data.data.login);
      this.reviews[i].username = data.data.login
    }

    for (let i = 0; i < this.reviews.length; i++) {
      console.log(this.reviews[i].user_id);
      this.reviews[i].avatar = await getAvatarByID(this.reviews[i].user_id);
    }
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
    showModel() {
      this.model = !this.model;
    },
    getImage(id) {
      if (this.all_reviews_image && id in this.all_reviews_image) {
        return this.all_reviews_image[id];
      } else {
        console.log(`Изображение с айди ${id} не найдено`);
        return '';
      }
    },
    getReviewAvatar(id) {
      if (this.all_reviews && id in this.all_reviews) {
        return this.all_reviews[id].avatar;
      } else {
        console.log(`Изображение с айди ${id} не найдено`);
        return '';
      }
    },
    getReviewAvatar(id) {
      if (this.reviews && id in this.reviews) {
        return this.reviews[id].avatar;
      } else {
        console.log(`Изображение с айди ${id} не найдено`);
        return '';
      }
    },
    imagesInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const binary = reader.result;
          this.avatar_final = binary;
        };
      }
    },
    uploadImage() {
      const avatar_pack = {
        user_id: localStorage.getItem("user_id"),
        file: this.avatar_final,
      }

      uploadAvatarByID(avatar_pack).then((res) => {
        console.log(res);
      });
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
      avatar: null,
      avatar_final: null,
      favourites: [],
      places: [],
      review_count: 0,
      all_reviews: [],
      all_reviews_image: [],
      model: false,
      email: "",
    };
  },
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





.all-reviews-marks-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.reviews_marks_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 80vw;
}

.reviews_marks_item i {
  position: absolute;
  left: 0;
  top: 0;
  color: #000000;
  z-index: 1;
  font-size: 20px;
  margin-right: 10px;
}

.reviews_marks_item input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  margin-right: 10px;
  width: 20px;
}


.highlight::before {
  content: "\f005";
  font-family: FontAwesome;
  color: rgb(255, 247, 0);
}

.place-full {
  min-height: 90vh;
}

.place-front {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.place-front h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-front p {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 2px;
  color: gray;
}

.place-front i {
  font-size: 18px;
  margin-bottom: 2px;
  color: gray;
}

.place-rating {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 5px;
}

.place-mark {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.place-mark i {
  color: #DC143C;
  margin-right: 3px;
  font-size: 20px;
}

.place-mark p {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.place-image-slider {
  width: 100%;
  height: 200px;
  position: relative;
}

.place-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  position: relative;
}

.place-number-of-photo {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 7px;
  font-size: larger;
}

.place-short-description {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
}

.place-nav-like {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
}

#info {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

#review {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.like {
  position: absolute;
  right: 0;
}

.like i {
  font-size: 35px;
  color: black;
}

.like i:hover {
  color: red;
}

.button-nav {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 200px;
  height: 30px;
}

.button-nav button {
  background-color: lightgray;
  border: none;
  color: black;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 3px solid white;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-button-rewiew {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.place-button-rewiew button {
  background-color: #DC143C;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 15px;
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

.text-area {
  width: 100%;
  height: 150px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
}

.review-desc {
  font-size: 30px;
  text-align: center;
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

.add_photo {
  margin-top: 30px;
}

#mark {
  margin-bottom: 10px;
}

.reviews-item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.reviews-item-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.gold {
  color: gold;
}

.reviews-item-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.reviews-item-header-mark {
  display: flex;
  flex-direction: row;
  width: 140px;
}

.marks i {
  font-size: 15px;
}

.marks {
  display: flex;
  align-items: flex-end;
}

.reviews-image-h1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.reviews-item-text {
  margin-top: 10px;
  font-style: italic;
  margin-bottom: 5px;
}

.reviews-item-date {
  font-size: 12px;
  color: gray;
  font-style: italic;
  display: flex;
  justify-content: flex-end;
}

.reviews-item {
  margin-top: 15px;
}

.reviews-item-text p {
  max-width: 80%;
}

.reviews-item {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

@media screen and (min-width: 768px) {
  .place-full {
    padding: 30px 100px;
  }

  .no-background {
    padding: 50px
  }

  .place-front h2 {
    font-size: 40px;
  }

  .place-front p {
    font-size: 30px;
  }

  .place-front i {
    font-size: 30px;
    margin-bottom: 4px;
  }

  .place-mark p,
  .place-mark i {
    font-size: 30px;
  }

  .place-image-slider {
    height: 500px;
  }


  .place-image {
    height: 500px;
  }

  .short-decription {
    margin-top: 15px;
    font-size: 25px;
  }

  .place-nav-like {
    height: 60px;
  }

  .button-nav {
    height: 60px;
    width: 600px;
  }

  #info {
    width: 300px;
    font-size: 20px;
  }

  #review {
    width: 300px;
    font-size: 20px;
  }

  .like {
    position: absolute;
    right: 0;
  }

  .like i {
    font-size: 60px;
    color: black;
  }

  .like i:hover {
    color: red;
  }

  .place-option p,
  .place-option i {
    font-size: 22px;
  }

  .place-options {
    margin-top: 50px;
  }

  .place-review-info h2 {
    font-size: 40px;
  }

  .place-button-rewiew {
    transform: scale(1.3);
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .clist div {
    font-size: 20px;
    margin: 5px;
  }

  .place-number-of-photo {
    font-size: 50px;
  }

  .reviews-item-header-mark {
    width: 200px;
  }

  .marks i {
    font-size: 22px;
  }

  .reviews-image-h1 h1 {
    font-size: 22px;
    margin-left: 15px;
  }

  .reviews-item-image img {
    height: 360px;
    margin-top: 20px;
  }

  .reviews-image-h1 img {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .reviews-item-date p {
    font-size: 15px;
  }

  .place-full {
    overflow: hidden;
  }

  .reviews-item {
    width: 70%;
    margin: 30px auto;
  }

  .reviews-item-date {
    margin-top: 20px;
  }


}
</style>
