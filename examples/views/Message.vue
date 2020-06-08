<template>
  <div class="wrapper">
    <r-button @click="showMessage">点击我</r-button>
    <r-button @click="showMessage1">点击我</r-button>
  </div>
</template>

<script>
export default {
  methods: {
    showMessage() {
      this.$message({
        message: "我是一个message 消息提示",
        duration: 3000,
        position: "right",
        type: "error"
      });
    },
    showMessage1() {
      this.$message({
        message: "我是一个message 消息提示",
        duration: 3000,
        position: "center",
        type: "success"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 300px;
  margin: 100px auto;
}
</style>