<template>
  <div class="input-number-inner">
    <r-input
      v-model="inputValue"
      center
      :disabled="disabled"
      @change="handleChange"
    >
      <div
        class="cursor-pointer"
        :class="{'is-disabled': decreaseDisabled}"
        slot="prepend"
        @click="handleClick('decrease')"
      >
        <r-icon name="jian"></r-icon>
      </div>
      <div
        class="cursor-pointer"
        :class="{'is-disabled': increaseDisabled}"
        slot="append"
        @click="handleClick('increase')"
      >
        <r-icon name="jia"></r-icon>
      </div>
    </r-input>
  </div>
</template>

<script>
export default {
  name: "r-inputnumber",
  props: {
    value: {
      type: [Number, String]
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: +Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        let { max, min, inputValue } = this;

        let limit = [
          {
            validate: value => !this.isNumber(value),
            res: inputValue
          },
          {
            validate: value => value >= max,
            res: max
          },
          {
            validate: value => value <= min,
            res: min
          },
          {
            validate: value => true,
            res: newValue * 1
          }
        ];

        console.log("newValue:" + newValue, ", inputValue:" + inputValue);

        let _value = limit.find(v => v.validate(newValue)).res;

        this.$emit("input", _value.toFixed(this.precision));
      }
    },
    decreaseDisabled() {
      return this.disabled || this.inputValue <= this.min;
    },
    increaseDisabled() {
      return this.disabled || this.inputValue >= this.max;
    }
  },
  methods: {
    handleClick(type) {
      if (type === "increase") {
        if (this.increaseDisabled) return;
        this.inputValue = Number(this.inputValue) + this.step;
      } else {
        if (this.decreaseDisabled) return;
        this.inputValue = Number(this.inputValue) - this.step;
      }
    },
    isNumber(num) {
      return (
        !isNaN(num * 1) &&
        Object.prototype.toString.call(num * 1) === "[object Number]"
      );
    },
    handleChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
.input-number-inner {
  width: 150px;
}
</style>