## Toast 

- 写html接口和样式
- 确定props
- 编写插件
- fade动画


## 再次编写遇到的问题

- transtion 组件动画，-active 时候没写好
- 组件移除时候把removeChild写成了 remove, 导致了整个文档被删除
- 移除组件 核心就是根据 visible 的true 、 false 来进行