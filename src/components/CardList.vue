<template>
    <div v-if="data.length > 0" class="card-list">
        <card-item place="places"></card-item>
    </div>
    <h2 v-else>Данные загружаются...</h2>
</template>

<script>
import CardItem from './CardItem.vue';
    export default {
        name: "card-list",
        props: {
            places: {
                type: Array,
                required: true
            }
        },
        components: {
            CardItem
        }
    }
</script>

<style>
    .card-list {
        display: flex;
        flex-direction: column;
    }
</style>