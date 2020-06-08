<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "r-radio-group",
  props: {
    value: {
      type: [String, Number]
    }
  },
  provide() {
    return {
      RadioGroup: this
    };
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>