<template>
  <div class="place">
    <div class="place-image">
      <span>{{ place.short_description }}</span>
      <img :src="image" alt="place" @click="routeToPlace" />
    </div>

    <div class="place-info-marks">

      <div class="place-info">

        <div class="place-name">
          <h2 @click="routeToPlace">{{ place.name }}</h2>
        </div>

        <div class="place-rating-category">
          <div class="div-place-rating">
            <p class="place-rating">
              <i class="fa fa-star" aria-hidden="true"></i>
            </p>
            <p class="place-rating-value">?</p>
          </div>
          <p class="place-category" @click="routeToPlace">
            {{ place.category }}, {{ place.subcategory }}
          </p>
        </div>

      </div>

      <div class="place-marks">
        <p class="like-red" @click="addToFavourite" v-if="InFavourites(place.place_id)">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </p>
        <p class="like" @click="addToFavourite" v-else>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { getImageByID, addToFavorite, getUserByID } from '@/api/methods';

export default {
  name: "card-item",
  props: ["place"],
  async mounted() {
    this.image = await getImageByID(this.place.place_id);
    this.image = this.image.slice(0, 1);
    console.log(this.image)

    const user = await getUserByID(localStorage.getItem("user_id"));
    this.favourites = user.favourites;


  },
  methods: {
    routeToPlace() {
      this.$router.push(`/place/${this.place.place_id}`);
    },
    addToFavourite() {
      const favorite_pack = {
        user_id: localStorage.getItem("user_id"),
        place_id: this.place.place_id,
      }

      addToFavorite(favorite_pack).then((response) => {
        console.log(response);
      });
    },
    InFavourites(place_id) {
      return this.favourites.includes(place_id);
    }
  },
  data() {
    return {
      image: "https://phonoteka.org/uploads/posts/2022-09/1663853186_2-phonoteka-org-p-znachok-zagruzki-bez-fona-instagram-2.png",
      favourites: [],
    };
  },
};
</script>

<style scoped>
.place {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border-radius: 10px;
  background-color: white;
  width: 380px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.place img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  border: 2px solid rgb(0, 0, 0);
}

.like:hover {
  color: #DC143C;
  margin-bottom: 5px;
}


.place-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
}


.place-info-marks {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.place-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 5px;
}

.place-rating-category {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.div-place-rating {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-style: bold;
}

.div-place-rating i {
  color: #DC143C;
  font-size: 20px;
}

.like i {
  margin-top: 5px;
  font-size: 30px;
}

.like-red i {
  margin-top: 5px;
  font-size: 30px;
  color: #DC143C;
}

.place-name {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.place-rating-value {
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
}

.place-category {
  font-style: italic;
}

.place-image {
  position: relative;
}

.place-image span {
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  background-color: #f5f5f5;
  border-radius: 55px;
  padding: 5px 10px;
}

@media screen and (min-width: 768px) {
  .place {
    width: 500px;
  }
}
</style>
