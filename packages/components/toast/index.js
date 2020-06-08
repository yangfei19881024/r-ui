import Toast from './index.vue';

let instance = null;
export default {
  install (Vue) {
    function generateInstance (options) {
      const Ctor = Vue.extend (Toast);

      instance = new Ctor ({
        propsData: options,
      }).$mount (document.createElement ('div'));

      if (options.onClose && typeof options.onClose === 'function') {
        instance.$once ('onClose', function () {
          options.onClose ();
        });
      }

      return instance;
    }

    Vue.prototype.$toast = function (options) {
      instance && instance.$destroy ();

      instance = generateInstance (options);
    };
  },
};
