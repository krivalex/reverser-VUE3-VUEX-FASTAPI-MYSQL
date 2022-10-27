<template>
    <div class="place">
        <!-- <img/> -->
        <h2>{{places[0].name}}</h2>
        <p>{{places[0].category}}</p>
        <my-button
        @click="$router.push(`/place/${place.id}`)"
        >
            Подробнее
        </my-button>
    </div>

</template>

<script>
    export default {
        name: "card-item",
        props: {
            places: {
                name: String,
                category: String,
            }
        }
    }
</script>

<style>
    .place {
        display: flex;
        flex-direction: column;
    }
</style>