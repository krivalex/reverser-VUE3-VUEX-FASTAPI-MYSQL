

<template>
  <div class="place-full">
    <img :src="place.image_url" alt="place" />
    <h2>{{ place.name }}</h2>
    <div class="place-info">
      <div>

        <p class="place-category">
          <strong>Категория:</strong> &nbsp; {{ place.category }}, {{ place.subcategory }}
        </p>
        <div class="place-address-2gis">
          <p class="place-address">
            <strong>Адрес:</strong> &nbsp; {{ place.geometry_name }}
          </p>
          <my-button @click="TwoGISRedirect" class="gis-btn">
            <img class="logo" src="@/assets/2gis.png" alt="logo" />
          </my-button>
        </div>
        <p class="place-phone"><strong>Телефон:</strong> &nbsp;{{ place.phone }}</p>

        <div class="place-time-label">
          <h3>Часы работы:</h3>
        </div>
        <div class="place-time">
          <p class="start-time">
            {{ place.start_work_time }}
          </p>
          <p class="divider">&nbsp;-&nbsp;</p>
          <p class="end-time">
            {{ place.end_work_time }}
          </p>
        </div>


        <p class="place-tags">
          <strong>Теги:</strong> &nbsp;{{ place.tags.map(tag => tag.name).join(", ") }}
        </p>


      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { data } from "@/data";
export default {
  name: "place-id-info",
  data() {
    const route = useRoute();
    console.log(route.params.id);
    const place = data.find((place) => place.id == route.params.id);
    console.log(place);
    return {
      place,
    };
  },
  methods: {
    TwoGISRedirect() {
      window.location.assign(this.place.TWOgis_url)
    },
  },

};
</script>

<style>
.place-full {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  height: 800px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.place-full img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid gray;
}

.place-info {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  justify-content: space-between;
}

.place-full h2 {
  margin-top: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border-bottom: 3px teal solid;
  padding-bottom: 5px;
}

.place-category {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-style: italic;

}

.place-address {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-style: italic;
}

.place-address-2gis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
}

.place-address-2gis img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.gis-btn {
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px teal solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-phone {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-style: italic;
}

.place-time {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
}

.divider {
  font-size: 30px;
  font-weight: bold;
}

.start-time {
  font-size: 20px;
  font-weight: bold;
  border: 3px rgb(7, 137, 72) solid;
  padding: 0.3rem 1rem;
}

.end-time {
  font-size: 20px;
  font-weight: bold;
  border: 3px rgb(137, 16, 7) solid;
  padding: 0.3rem 1rem;
}

.place-time-label h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
}

.place-tags {
  display: flex;
  justify-content: flex-start;
  font-style: italic;
  margin-top: 4.5rem;
  align-items: flex-start;
  color: teal
}
</style>
