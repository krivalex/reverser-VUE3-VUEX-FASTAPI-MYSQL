<template>
  <div>
    <img :src="this.profile_img" alt="profile_img" />
    <h1>{{ this.username }}</h1>
    <h2>{{ this.phone_number }}</h2>
    <p>{{ this.coins }}</p>
    <p>{{ this.rewards }}</p>

    <h1>Любимые места</h1>
    <div v-for="favourite in favourites" :key="favourite.id">
      <card-item v-for="p in places" :place="p" />
    </div>
  </div>
</template>

<script>
import { CardItem } from "@/components/CardItem.vue";
export default {
  name: "Profile",
  components: {
    CardItem,
  },
  data() {
    return {
      username: "",
      phone_number: "",
      coins: 0,
      rewards: [],
      profile_img: "",
      status: "",
      favourites: [],
    };
  },
};
</script>

<style scoped>
</style>
