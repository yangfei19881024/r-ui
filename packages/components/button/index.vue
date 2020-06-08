<template>
  <button
    class="r-button"
    :disabled="disabled"
    :class="styleClass"
    @click="handleClick"
  >
    <span v-if="icon">
      <r-icon :name="icon"></r-icon>
    </span>

    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "r-button",
  props: {
    type: {
      type: String,
      default: "",
      validator: value => {
        return ["", "primary", "success", "warning", "danger"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    }
  },
  computed: {
    styleClass() {
      return {
        [`r-button--${this.type}`]: this.type,
        ["is-round"]: this.round,
        "is-disabled": this.disabled
      };
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
@import "./style.scss";
</style>