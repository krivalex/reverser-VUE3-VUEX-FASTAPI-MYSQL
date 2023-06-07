<template>
  <section id="trend">
    <div v-if="places">
      <div class="profile-label">
        <h1>Ваши персональные рекомендации</h1>
      </div>
      <div class="cards" v-if="places">
        <card-item v-for="item in places" :key="item" :place="item" />
      </div>
      <div v-else>
        <h1 class="info">Ваши рекомендации еще не сформированы, просмотрите больше заведений, поставьте лайки или отзывы
        </h1>
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
  name: "trend-page",
  components: {
    CardItem,
    MyLoader,
  },
  async mounted() {
    const user_id = localStorage.getItem("user_id");
    await this.$store.dispatch("fetchRecommendation", user_id);
    await this.$store.dispatch("fetchAllPlaces");
  },
  computed: {
    recommendation() {
      if (this.$store.state.recommendation === null) {
        return [];
      }

      console.log(this.$store.state.recommendation);

      const first_stage = Object.values(this.$store.state.recommendation);
      const second_stage = first_stage.flatMap(obj => Object.values(obj)[0]);

      return second_stage;
    },
    all_places() {
      return this.$store.state.all_places;
    },
    places() {
      if (this.all_places === null) {
        return [];
      }

      if (this.recommendation.length === 0) {
        return [];
      }

      const filteredPlaces = this.all_places.filter(place => {
        return this.recommendation.includes(place.place_id);
      }).reverse();

      console.log(filteredPlaces);

      return filteredPlaces;
    },
  },
}

</script>

<style scoped>
#trend {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  text-align: center;
  margin: 0 10px;
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

.info {
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  color: var(--main-haki-color);
}
</style>
