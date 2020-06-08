<template>
  <transition name="message-fade">
    <div
      class="r-message"
      :class="computedClass"
      :style="computedStyle"
      v-if="visible"
    >
      <div class="r-message__content">
        <span v-if="type">
          <r-icon :name="getIconName"></r-icon>
        </span>
        {{message}}
        <span
          class="close-btn"
          @click="closeMessage"
        >
          <r-icon name="close"></r-icon>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "right"
    },
    type: {
      type: String,
      validator: value => {
        return ["success", "error", "info", "warning"].includes(value);
      }
    }
  },
  data() {
    return {
      visible: false,
      verticalTop: 0,
      baseOffset: 16
    };
  },
  mounted() {
    if (this.autoClose) {
      this.startTimer();
    }

    this.createElment();
  },
  methods: {
    createElment() {
      this.visible = true;
      document.body.appendChild(this.$el);
    },
    closeMessage() {
      this.visible = false;
    },
    startTimer() {
      let timer = setTimeout(() => {
        this.visible = false;
      }, this.duration);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
        timer = null;
      });
    }
  },
  computed: {
    getIconName() {
      const ICONS = {
        success: "gou1",
        error: "chahao",
        info: "info",
        warning: "warn"
      };
      return ICONS[this.type];
    },
    computedClass() {
      return {
        [`r-message--${this.type}`]: this.type
      };
    },
    computedStyle() {
      return {
        top: this.verticalTop + "px",
        ...(this.LR_POSTION && {
          [`${this.position}`]: this.baseOffset + "px"
        }),
        ...(this.CENTER_POSTION && {
          left: "50%",
          marginLeft: "-190px"
        })
      };
    },
    LR_POSTION() {
      return this.position === "left" || this.position === "right";
    },
    CENTER_POSTION() {
      return this.position === "center";
    }
  },
  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el);
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$el.addEventListener("transitionend", () => {
          this.$destroy();
        });
        this.$emit("close");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>