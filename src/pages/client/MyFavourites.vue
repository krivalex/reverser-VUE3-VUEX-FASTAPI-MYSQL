<template>
  <section id="profile">
    <div v-if="places">
      <div class="profile-label">
        <h1>Избранное</h1>
      </div>
      <div class="cards" v-if="places.length !== 0">
        <card-item v-for="item in places" :key="item.place_id" :place="item" />
      </div>
      <div v-else>
        <h1 class="info">Вы еще не добавили не одного заведения в избранные</h1>
      </div>
    </div>
    <div v-else>
      <my-loader />
    </div>
  </section>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import MyLoader from '@/components/UI/MyLoader.vue';

export default {
  name: "answer-to-reviews-page",
  components: {
    CardItem,
    MyLoader,
  },
  async mounted() {
    const user_id = Number(localStorage.getItem("user_id"));
    await this.$store.dispatch("fetchAllPlaces");
    await this.$store.dispatch("fetchUserInfo", user_id);
  },
  // async updated() {
  //   await this.$store.dispatch("fetchUserInfo", this.$store.state.user_id);
  // },
  computed: {
    favourites() {
      if (this.$store.state.user_info === null) {
        return {};
      } else {
        const favouritesObj = JSON.parse(this.$store.getters.getUserInfo.favourites);
        return Object.values(favouritesObj);
      }
    },
    all_places() {
      return this.$store.state.all_places;
    },
    places() {
      if (this.all_places === null) {
        return [];
      }

      if (this.favourites.length === 0) {
        return [];
      }

      return this.all_places.filter(place => {
        return this.favourites.includes(place.place_id);
      }).reverse();
    }
  },
  data() {
    return {
      favourites_places: [],
    };
  },
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

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

.info {
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  color: var(--main-haki-color);
}
</style>
