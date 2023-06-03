<template>
  <section id="profile">
    <div class="profile-label">
      <h1>Избранное</h1>
    </div>
    <div class="cards">
      <card-item v-for="item in places" :key="item.place_id" :place="item" />
    </div>
  </section>
</template>

<script>
import CardItem from '@/components/CardItem.vue';

export default {
  name: "answer-to-reviews-page",
  components: {
    CardItem,
  },
  async mounted() {
    const user_id = Number(localStorage.getItem("user_id"));
    await this.$store.dispatch("fetchAllPlaces");
    await this.$store.dispatch("fetchUserInfo", user_id);
  },
  async updated() {
    await this.$store.dispatch("fetchUserInfo", this.$store.state.user_id);
  },
  computed: {
    favourites() {
      if (this.$store.state.user_info.favourites === null) {
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
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
