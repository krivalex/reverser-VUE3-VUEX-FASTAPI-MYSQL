<template>
  <section id="trend">
    <img class="waiting" src="https://www.cqf.su/img/in-construct.png">
  </section>
</template>

<script>

export default {
  name: "answer-to-reviews-page",
};

</script>

<style scoped>
.waiting {
  width: 75%;
  margin: auto auto;
  filter: contrast(0);
}

#trend {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

}

@media screen and (min-width: 768px) {
  .waiting {
    width: 40%;
    margin: auto auto;
  }
}
</style>
