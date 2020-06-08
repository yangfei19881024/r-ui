<template>
  <div>
    我是一个modal 内容
    <r-button
      type="primary"
      @click="closeMe"
    >关闭</r-button>
    <h1>哈哈哈</h1>
    <h2>我是传递过来的参数: {{params.name}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  methods: {
    closeMe() {
      // this.$emit("close");
      // this.$emit("success", {
      //   status: "success"
      // });
      this.$emit("fail", {
        status: "fail"
      });
    }
  }
};
</script>

<style scoped>
</style>