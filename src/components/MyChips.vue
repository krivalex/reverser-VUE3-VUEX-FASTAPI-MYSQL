<template>
  <div class="input-all">
    <form @submit.prevent="handleSubmit" class="input-input">
      <div class="input-icon">
        <i v-if="searchTag.length == 0" class="fa fa-search"></i>
        <my-input type="search" v-model="searchTag" @input="getTag" class="input-main-input"
          placeholder="Поиск по тегам" />
      </div>
    </form>
    <div v-if="searchTag.length > 0" class="input-list">
      <div class="citem" v-for="item in prefenceTag()" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
  </div>
  <div class="chip_form" v-if="searchTag.length == ''">
    <div class="chip_list" v-if="marked.length !== 0">
      <div class="chip" v-for="item in marked" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
    <!-- <div class="chip_preview" v-else>
      Нажмите на теги, или найдите их через поиск
    </div> -->
    <div v-if="lst.length > 0" class="clist">
      <div class="citem-popular citem" v-for="item in lst.slice(0, 30)" :key="item" @click="doSelect(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'my-chips',
  props: ['list'],
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
  async mounted() {
    this.lst = await this.list
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
  data() {
    return {
      marked: [],
      lst: [],
      searchTag: ''
    }
  },
}

</script>

<style scoped>
.chip_form {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 350px;
}

.chip_list {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  border-radius: 55px;
  padding: 10px 20px;
  color: #fff;
  background-color: #000000;
  width: fit-content;
  margin: 3px 5px;
  cursor: pointer;
}

.clist::-webkit-scrollbar {
  display: none;
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
  background-color: #888888;
  color: white;
  font-size: 18px;
}

.citem:hover {
  background-color: #DC143C;
}

.recomendation {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.search_chip_add {
  visibility: hidden;
}

.input-main-input {
  background-color: black;
  color: white;
  border-radius: 20px;
}

::-webkit-input-placeholder {
  color: white;
  text-align: center;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  text-align: center;
  margin: auto auto;
}

.input-icon {
  color: white;
  font-size: 20px;
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 45%;
  left: 5%;
}

.citem-popular {
  background-color: #908f8f;
  color: white;
  font-size: 15px;
  padding: 5px 10px;
}

.clist {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin: 0 10px;
  margin-top: 20px;
  height: 200px;
  overflow: auto;
  justify-content: space-around;
}

.input-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-height: 40vh;
  overflow: auto;
}

.chip_preview {
  color: black;
  font-size: 20px;
  font-style: italic;
  text-align: center;
}

.input-all {
  margin-bottom: 10px;
  width: 90%;
  margin: 0 auto;
}

@media screen and (min-width: 768px) {
  .citem {
    max-height: 50px;
  }

  .chip_form {
    overflow: hidden;
    max-height: 250px;
    max-width: 70%;
    margin: 0 auto;
  }

  .input-icon i {
    position: absolute;
    top: 45%;
    left: 3%;
  }

  .input-icon input {
    width: 400px;
  }

  .input-all {
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .input-input {
    width: 100%;
  }

  .input-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
