<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "r-checkbox-group",
  props: {
    value: {
      type: Array
    }
  },
  provide() {
    return {
      CKGroup: this
    };
  }
};
</script>

<style scoped>
</style>