<template>
  <div class="input-number-container">
    <r-inputnumber
      :value="count"
      :step="0.2"
      :max="10"
      :min="1"
      :precision="2"
      @input="(data) => count=data"
    ></r-inputnumber>
    <h1>{{count}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5
    };
  }
};
</script>

<style scoped lang="scss">
.input-number-container {
  width: 300px;
  margin: 100px auto;
}
</style>