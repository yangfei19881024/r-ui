<template>
  <div
    class="preview-container"
    :style="computedStyle"
  >
    <img
      :src="params.url"
      ref="previewImage"
      @load="loadImage"
      alt=""
    >
    <span
      class="close-btn"
      @click="handleClose"
    >
      <r-icon name="close"></r-icon>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  data() {
    return {
      computedStyle: null
    };
  },
  methods: {
    loadImage() {
      if (this.$el.offsetHeight >= document.documentElement.clientHeight) {
        this.computedStyle = {
          height: document.documentElement.clientHeight - 100 + "px",
          overflow: "auto"
        };
      }
    },
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
img {
  width: 80%;
  max-width: 100%;
}
.preview-container {
  position: relative;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
}
</style>