<template>
  <div class="mask">
    <transition
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <div
        class="modal-content"
        v-if="visible"
      >
        <TempComponent
          @close="close"
          @success="successCallback"
          @fail="failCallback"
          :params="params"
        ></TempComponent>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    template: null,
    params: Object,
    success: Function,
    fail: Function
  },
  data() {
    return {
      visible: false
    };
  },
  components: {
    TempComponent: null
  },
  mounted() {
    this.createElement();
  },
  methods: {
    createElement() {
      this.visible = true;
      document.body.appendChild(this.$el);
    },
    close() {
      this.visible = false;
    },
    destroyElement() {
      this.$destroy();
    },
    successCallback(data) {
      this.success(data);
      this.close();
    },
    failCallback(data) {
      this.fail(data);
      this.close();
    }
  },
  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el);
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$el.addEventListener("animationend", this.destroyElement, false);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>