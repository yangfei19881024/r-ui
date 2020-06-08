<template>
  <div>
    <r-button
      type="primary"
      @click="handleClick"
      disabled
    >primary</r-button>
    <r-button
      type="success"
      round
    >success</r-button>
    <r-button
      type="warning"
      icon="info"
    >warning</r-button>
    <r-button
      type="danger"
      @click="handleClick"
    >danger</r-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert(1);
    }
  }
};
</script>

<style scoped>
</style>