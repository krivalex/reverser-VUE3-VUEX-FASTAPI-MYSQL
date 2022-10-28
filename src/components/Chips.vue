<template>
  <div class="chip_form">
    <div class="chip_list">
      <div class="chip" v-for="item in marked" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
    <div class="recomendation">Рекомендации:</div>
    <div v-if="lst.length > 0" class="clist">
      <div class="citem" v-for="item in lst" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data() {
    return {
      marked: [],
      lst: [],
    }
  },
  methods: {
    doSelect(val) {
      if (!this.marked.includes(val)) {
        this.marked.push(val)
        this.lst = this.lst.filter((el) => el != val)
      } else {
        this.marked = this.marked.filter((el) => el != val)
        this.lst.push(val)
      }
      this.$emit('selected', this.marked)
    },
  },
  mounted() {
    this.lst = this.list
  },
}
</script>
<style scoped>
.chip_form {
  margin: 5px 5px;
  padding: 20px;
  box-shadow: 0px 1px 6px #a3bcb9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 500px;
  background-color: #eee;
}

.chip_list {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  border-radius: 55px;
  padding: 10px 20px;
  color: #fff;
  background-color: teal;
  box-shadow: 0px 1px 6px #86efac;
  width: fit-content;
  margin: 3px 5px;
  cursor: pointer;
}

.clist {
  margin-top: 20px;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.clist::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.citem {
  padding: 10px 20px;
  border-radius: 1rem;
  cursor: pointer;
  margin-right: 5px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: rgb(121, 173, 173);
  color: white
}

.citem:hover {
  background-color: #a3bca1;
}

.recomendation {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
}
</style>
