## 打包

- 全局引入
- 按需加载，需要引入 css
- 真正按需加载

在 webpack 中，程序读取文件,现在是写在 `entry_config.js` 文件中的

## 使用过程中遇到的问题

1. `npm run serve` 报错 Module build failed. No ESLint configuration found.

```javascript
// vue.config.js
module.exports = {
  chainWebpack: (config) => config.resolve.symlinks(false),
}
```

2. 组件的名称是根据 package.json 中的 name 来定的
   比如 import UI from `'rx-ui'` 这里的 `rx-ui` 是 package.json 中的 name 名称

3. 组件命名全部消息，有复名的 用-比如 `message-box`

4. 组件的 name 统一加前缀用 `r-name`

5. 每个组件都需要 style 样式

6. 缺少一个全局的 reset 样式
