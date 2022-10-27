<template>
  <div class="chip_form">
    <div class="chip_list">
      <div class="chip" v-for="item in marked" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
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
  margin: 10px;
  padding: 20px;
  box-shadow: 0px 1px 6px #a3bcb9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
}
.chip_list {
  display: flex;
  flex-wrap: wrap;
}
.chip {
  border-radius: 55px;
  padding: 10px 30px;
  color: #fff;
  background-color: #67db91;
  box-shadow: 0px 1px 6px #86efac;
  width: fit-content;
  margin: 5px;
  cursor: pointer;
}
.clist {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.citem {
  padding: 10px 20px;
  border-top: 1px solid #a3bcb9;
  cursor: pointer;
}
.citem:hover {
  background-color: #eee;
}
</style>
