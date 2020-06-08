<template>
  <div>
    <r-button
      type="primary"
      @click="showMessageBox"
    >点击出现</r-button>
  </div>
</template>

<script>
export default {
  methods: {
    showMessageBox() {
      this.$alert({
        title: "我是标题",
        content: "我是内容",
        onOk: () => {
          // alert("onOk");
        },
        onCancel: () => {
          // alert("onCancle");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>