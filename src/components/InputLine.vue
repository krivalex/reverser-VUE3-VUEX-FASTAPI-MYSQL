<template>
    <div class="main-input">
        <form @submit.prevent>
            <h4>Впишите теги</h4>
            <my-input v-focus v-model="tag.value" type="text" placeholder="Tags" />
            <my-button class="search-btn" @click="searchPlaces">
                Найти
            </my-button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tag: {
                value: '',
            }
        }
    },
    methods: {
        searchPlaces() {

        }
    },
    name: "input-line",
}

</script>

<style>
form {
    display: flex;
    flex-direction: column;
}

.search-btn{
    justify-content: center;
    margin-top: 10px;
    align-self: center;
}
</style>