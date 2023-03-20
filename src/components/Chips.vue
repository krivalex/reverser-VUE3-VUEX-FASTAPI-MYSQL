<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <my-input v-model="searchTag" @input="getTag" />
      <my-button class="search_chip_add" type="submit" @click="addTag">Add</my-button>
    </form>
    <div v-if="searchTag.length > 0">
      <div class="citem" v-for="item in prefenceTag()" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
  </div>
  <div class="chip_form" v-if="searchTag.length == ''">
    <div class="chip_list">
      <div class="chip" v-for="item in marked" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
    <div class="recomendation">
      Рекомендации:
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
      searchTag: ''
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
      this.searchTag = ''
    },
    addTag() {
      this.searchTag = this.searchTag.trim()
      this.searchTag = this.searchTag.toLowerCase()
      if (!this.marked.includes(this.searchTag)) {
        this.marked.push(this.searchTag)
        this.lst = this.lst.filter((el) => el != this.searchTag)
      } else {
        this.marked = this.marked.filter((el) => el != this.searchTag)
        this.lst.push(this.searchTag)
      }
      this.searchTag = ''
      this.$emit('selected', this.marked)
    },
    wantTag(val) {
      for (let i = 0; i < val.length; i++) {
        if (!this.marked.includes(val[i])) {
          return
        }
        this.lst = this.lst.filter((el) => el !== val)
        this.addTag()
      }
    },
    sortList() {
      this.lst.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
    },
    prefenceTag() {
      let pref = []
      for (let i = 0; i < this.lst.length; i++) {
        if (this.lst[i].toLowerCase().includes(this.searchTag)) {
          pref.push(this.lst[i])
        }
      }
      return pref
    },
    getTag(event) {
      this.searchTag = event.target.value.toLowerCase()
    },
  },
  mounted() {
    this.lst = this.list
    const uniqueValues = new Set(this.list)
    if (this.list.length > 0 && uniqueValues.size > 0) {
      this.lst = Array.from(uniqueValues)
    }
    for (let i = 0; i < this.lst.length; i++) {
      if (this.lst[i] === "" || this.lst[i] === " ") {
        this.lst.splice(i, 1);
        i--;
      }
    }
  },
  emits: ['selected'],
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
  background-color: #f53b3b;
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
  background-color: #FD6D6D;
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

.search_chip_add {
  visibility: hidden;
}
</style>
