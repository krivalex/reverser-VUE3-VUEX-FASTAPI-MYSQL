<template>
  <i class="like-red fa fa-heart" aria-hidden="true" @click="addToFavourites" v-if="ifInFavourite"></i>
  <i class="like fa fa-heart" aria-hidden="true" @click="addToFavourites" v-else></i>
</template>

<script>
import { addToFavorite, getUserByID } from '@/api/methods';
export default {
  name: "favourite-button",
  props: ["place"],
  async mounted() {
    const user = await getUserByID(Number(localStorage.getItem("user_id")));
    this.favourites = JSON.parse(user.data.favourites);
  },
  data() {
    return {
      favourites: "",
    };
  },
  methods: {
    async addToFavourites() {
      const favorite_pack = {
        user_id: Number(localStorage.getItem("user_id")),
        place_id: this.place.place_id,
      }

      if (this.place.place_id in this.favourites) {
        delete this.favourites[this.place.place_id];
      }
      else {
        this.favourites[this.place.place_id] = this.place.place_id;
      }

      await addToFavorite(favorite_pack).then((response) => {
        console.log(response);
      });

    },
  },
  InFavourites(place_id) {
    if (this.favourites === "") {
      return false;
    }
    if (place_id in this.favourites) {
      return true;
    }
    else {
      return false;
    }
  },
  computed: {
    ifInFavourite() {
      if (this.favourites === "") {
        return false;
      }
      if (this.place.place_id in this.favourites) {
        return true;
      }
      else {
        return false;
      }
    },
  },
}
</script>

<style>
.like {
  color: rgba(255, 255, 255, 0.494);
  -webkit-text-stroke: 2px #000000;
  padding-right: 5px;
  font-size: 30px;
  z-index: 100;
}

.like-red {
  -webkit-text-stroke: 2px #000000;
  padding-right: 5px;
  font-size: 30px;
  color: #DC143C;
  z-index: 100;
}
</style>
