import Uploader from './index.vue'

Uploader.install = function(Vue) {
  Vue.component(Uploader.name, Uploader)
}

export default Uploader
