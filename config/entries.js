let path = require('path');
module.exports =  [
    {
        name:'detail',//名称  对应入口
        pathEntry:'./src/detail/index.js',//开发时路径（如果不传就默认为src/【name】/index.js）,
        pathDev:'src/detail/index.html',//开发时路径（如果不传就默认为src/【name】/index.html）
        pathPro:'app/detail/index.html',//打包时路径（如果不传就默认为app/【name】/index.html）
    },
    {
        name:'home',
    }
]