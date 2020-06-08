// babel.config.js
module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    [
      '@babel/preset-env',
      {
        // 这儿有false, entry, usage三个可选参数，usage可以按需引入polyfill
        useBuiltIns: 'usage',
        // 指定corejs版本
        corejs: 2,
      },
    ],
  ],
}
