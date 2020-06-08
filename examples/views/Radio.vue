<template>
  <div>
    <r-radio-group v-model="group_sex">
      <r-radio label="男人">男人</r-radio>
      <r-radio label="女人">女人</r-radio>
      <r-radio label="人妖">人妖</r-radio>
    </r-radio-group>
    <h1>{{group_sex}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group_sex: "男人"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>