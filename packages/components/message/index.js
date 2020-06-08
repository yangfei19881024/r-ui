import Message from './index.vue'
let instances = []
let verticalTop = 16
let index = 0
export default {
  install(Vue) {
    function computedVerticalTop(position) {
      let filterInstances = instances.filter(
        (instance) => instance.position === position
      )

      return filterInstances.reduce((acc, cul) => {
        return cul.$el.offsetHeight + acc + verticalTop
      }, verticalTop)
    }

    function updateVerticalTop(instance) {
      let removeTop = instance.verticalTop

      let index = 0

      for (; index < instances.length; index++) {
        if (instances[index].id === instance.id) {
          break
        }
      }

      instances.splice(index, 1)

      for (; index < instances.length; index++) {
        if (instances[index].position === instance.position) {
          ;[instances[index].verticalTop, removeTop] = [
            removeTop,
            instances[index].verticalTop,
          ]
        }
      }
    }

    function generateInstance(options) {
      const Ctor = Vue.extend(Message)

      let instance = new Ctor({
        propsData: options,
      }).$mount(document.createElement('div'))

      instance.verticalTop = computedVerticalTop(instance.position)

      instance.id = 'message-' + index++

      instance.$once('close', function() {
        updateVerticalTop(instance)
      })

      return instance
    }

    Vue.prototype.$message = function(options) {
      let instance = generateInstance(options)
      instances.push(instance)
    }
  },
}
