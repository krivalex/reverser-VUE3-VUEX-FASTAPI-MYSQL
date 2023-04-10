<template>
  <section id="trend">

    <div class="trend-label">
      <h1>Ваши рекомендации</h1>
    </div>

    <div v-for="p in places" :key="p.id">
      <div class="profile-recomendation" v-for="recomendation in recomendations" :key="recomendation">
        <card-item v-if="recomendation === p.id" :place="p" />
      </div>
    </div>

    <div class="zaglushka"></div>
  </section>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import { data } from "@/data";

export default {
  setup() {
    return {
      places: data,
    };
  },
  name: "Profile",
  components: {
    CardItem,
  },
  data() {
    return {
      recomendations: [6, 7, 8]
    };
  },
};

</script>

<style scoped>
.trend-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}

.trend-label h1 {
  font-size: 30px;
  padding: 5px 20px;
  margin: 0;
  margin-right: 10px;
  background-color: #DC143C;
  color: white;
  border-radius: 10px;
  margin-bottom: 50px;
}

.profile-recomendation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 10px;
}
</style>
