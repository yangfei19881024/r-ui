<template>
  <div class="inline-container">
    <template v-if="type==='textarea'">
      <textarea
        class="r-textarea"
        :disabled="disabled"
        v-bind="$attrs"
        v-on="MyListeners"
        v-model="inputValue"
      ></textarea>
    </template>

    <template v-else>
      <div
        class="inline-container"
        :class="className"
      >
        <div
          class="r-input-prepend"
          v-if="$slots.prepend"
        >
          <slot name="prepend"></slot>
        </div>
        <div class="r-input-outer">
          <input
            type="text"
            class="r-input"
            :class="styleClass"
            :disabled="disabled"
            v-bind="$attrs"
            v-on="MyListeners"
            v-model="inputValue"
          >
          <span
            class="r-input-clear"
            @click="clearInput"
            v-if="showClear"
          >
            <r-icon name="chahao"></r-icon>
          </span>
        </div>

        <div
          class="r-input-append"
          v-if="$slots.append"
        >
          <slot name="append"></slot>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "r-input",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator: value => {
        return ["text", "textarea"].includes(value);
      }
    },
    size: {
      type: String,
      default: "",
      validator: value => {
        return ["", "medium", "small"].includes(value);
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.$parent.$emit("validate");
      }
    },
    MyListeners() {
      return Object.assign(this.$listeners, {
        input: event => this.$emit("input", event.target.value)
      });
    },
    showClear() {
      return this.clearable && this.inputValue !== "";
    },
    styleClass() {
      return {
        "is-disabled": this.disabled,
        "is-center": this.center
      };
    },
    className() {
      return {
        "has-prepend": this.$slots.prepend,
        "has-append": this.$slots.append
      };
    }
  },
  methods: {
    clearInput() {
      this.inputValue = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>