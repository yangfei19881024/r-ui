// 分离打包时的入口配置文件

const fs = require ('fs');
const path = require ('path');

let files = fs.readdirSync (path.resolve (__dirname, './components/'));

module.exports = files.filter (file => !~file.indexOf ('.'));
