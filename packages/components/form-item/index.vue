<template>
  <div class="r-form-container">
    <div class="r-form-item">
      <span
        class="required-star"
        v-if="isRequired"
      >*</span>
      <label
        class="r-form-item--label"
        :style="{width: this.Form.labelWidth}"
      >{{label}}</label>
      <slot></slot>
    </div>
    <transition name="error-fade">
      <div
        v-if="error"
        class="error-tips"
        :style="{marginLeft: Form.labelWidth}"
      >
        {{error}}
      </div>
    </transition>
  </div>
</template>

<script>
import schema from "async-validator";

export default {
  name: "r-form-item",
  inject: ["Form"],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    this.$on("validate", this.startValidate);
  },
  computed: {
    isRequired() {
      return (
        this.prop &&
        (this.Form.rules[this.prop] || []).some(con => con.required)
      );
    }
  },
  methods: {
    startValidate() {
      let rules = this.Form.rules;
      let model = this.Form.model;

      var descriptor = rules[this.prop]
        ? {
            [`${this.prop}`]: rules[this.prop]
          }
        : {};

      var validator = new schema(descriptor);

      return validator.validate(
        {
          [`${this.prop}`]: model[this.prop]
        },
        (errors, fileds) => {
          if (errors) {
            this.error = errors[0].message;
          } else {
            this.error = "";
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>