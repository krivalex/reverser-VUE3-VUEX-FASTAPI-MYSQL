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
            <img :src="this.profile_img" alt="profile_img" />
          </div>
        </div>

        <div class="profile-status">
          <h1>{{ this.username }}</h1>
          <h2>{{ this.status }}</h2>
        </div>
      </div>

      <div class="status-container">
        <div class="status-label">
          <p>6</p>
          <i class="fa fa-heart" id="star"></i>
        </div>
        <div class="status-label">
          <p>3</p>
          <i class="fa fa-check" id="check"></i>
        </div>
        <div class="status-label">
          <p>2</p>
          <i class="fa fa-trophy" id="trophy"></i>
        </div>
        <div class="status-label">
          <p>10</p>
          <i class="fa fa-dollar" id="dollar"></i>
        </div>
      </div>
    </div>

    <div class="profile-label" id="favourite">
      <h1>Избранное</h1>
    </div>

    <div v-for="place in places" :key="place.id">
      <div class="profile-favourites" v-for="favourite in favourites" :key="favourite">
        <card-item v-if="favourite === place.id" :place="place" />
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
      username: "Алексей",
      phone_number: "+77022618926",
      coins: 10,
      rewards: ["obsidian", "diamond"],
      profile_img: "https://popgolf.com/wp-content/uploads/2021/09/unnamed-e1631869170769.jpeg",
      status: "admin",
      favourites: [3, 13, 5],
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
</style>
