<template>
  <div class="place">
    <div class="place-image">
      <span>{{ place.short_description }}</span>
      <div class="place-marks">
        <!-- <p class="like-red" @click="addToFavourite" v-if="InFavourites(place.place_id)">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </p> -->
        <p class="like" @click="addToFavourite">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </p>
      </div>
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

    const user = await getUserByID(Number(localStorage.getItem("user_id")));
    this.favourites = user.data.favourites;


  },
  methods: {
    routeToPlace() {
      this.$router.push(`/place/${this.place.place_id}`);
    },
    addToFavourite() {
      const favorite_pack = {
        user_id: Number(localStorage.getItem("user_id")),
        place_id: this.place.place_id,
      }

      addToFavorite(favorite_pack).then((response) => {
        console.log(response);
      });

      this.favourites = this.favourites.split(",");

      if (this.place.place_id in this.favourites) {
        delete this.favourites[this.place.place_id];
      } else {
        this.favourites[this.place.place_id] = true;
      }
    },
    InFavourites(place_id) {
      return Object.keys(this.favourites).includes(place_id);
    }
  },
  data() {
    return {
      image: "https://phonoteka.org/uploads/posts/2022-09/1663853186_2-phonoteka-org-p-znachok-zagruzki-bez-fona-instagram-2.png",
      favourites: "",
    };
  },
};
</script>

<style scoped>
.place {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  margin-top: 15px;
  border-radius: 10px;
  background-color: white;
  width: 380px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-image: url('@/assets/b.jpg');
  background-repeat: repeat;
}

.place img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  border: 0px solid rgb(0, 0, 0);
}

.like i {
  color: rgba(255, 255, 255, 0.494);
  -webkit-text-stroke: 2px #000000;
  padding-right: 5px;
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
  bottom: 5%;
  right: 2%;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  background-color: #f5f5f5;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 55px;
  padding: 5px 10px;
}

.place-marks {
  position: absolute;
  top: 5%;
  right: 2%;
}

@media screen and (min-width: 768px) {
  .place {
    width: 500px;
  }
}
</style>
