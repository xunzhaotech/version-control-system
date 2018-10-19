

const path = require('path');

module.exports = {
  listen: {
    port: 7001
  },
  mongodb: {
    url: 'mongodb://106.14.154.107:27017',
    name: 'version_control_system'
  },
  env: {
    NODE_ENV: 'development'
  },
  static: {
    maxage: 0, //浏览器缓存max-age（以毫秒为单位）
    hidden: false, //允许传输隐藏文件
    index: 'index.html', // 默认文件名，默认为'index.html'
    defer: false, //如果为true，则使用后return next()，允许任何下游中间件首先响应。
    gzip: true, //当客户端支持gzip时，如果存在扩展名为.gz的请求文件，请尝试自动提供文件的gzip压缩版本。默认为true。
  },
  // static: path.join(process.cwd(), 'app/static'),
  compress: { threshold: 2048 },//koa-compress 配置gizp
  webpack: {
    listen: {
      port: 8888
    },
    options: {
      // all options optional
      noInfo: false,
      // display no info to console (only warnings and errors)
   
      quiet: false,
      // display nothing to the console
   
      lazy: false,
      // switch into lazy mode
      // that means no watching, but recompilation on every request
   
      watchDelay: 300,
      // delay after change (only lazy: false)
   
      publicPath: "/",
      // public path to bind the middleware to
      // use the same as in webpack
   
      headers: { "X-Custom-Header": "yes" },
      // custom headers
      //https://www.webpackjs.com/configuration/stats/
      stats: {
        colors: true,
        builtAt: true,
      },
      // options for formating the statistics
    }
  }
}