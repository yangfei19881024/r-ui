import Modal from './index.vue';

console.log (Modal);

export default {
  install (Vue) {
    function createConstructor (options) {
      Modal.components.TempComponent = options.template;
      return Vue.extend (Modal);
    }

    function generateInstance (options) {
      const Ctor = createConstructor (options);

      let instance = new Ctor ({
        propsData: options,
      }).$mount (document.createElement ('div'));
    }

    Vue.prototype.$modal = function (options) {
      generateInstance (options);
    };
  },
};
