<template>
    <div>
        <h1>Страница поиска (ALPHA)</h1>
        <input-line></input-line>
        <card-list places="places"></card-list>
    </div>
</template>
  
<script>
import InputLine from '@/components/InputLine.vue'
import CardList from "@/components/CardList.vue"
export default {
    components: {
        InputLine,
        CardList
    },
    name: "main-page",
    props: {
        places: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>