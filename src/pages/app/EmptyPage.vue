<template>
  <section>
    <h1>Пока список пуст</h1>
    <p>Скоро тут будет что-то интересное</p>
  </section>
</template>

<script>
export default {
  name: "empty-page",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
};
</script>
