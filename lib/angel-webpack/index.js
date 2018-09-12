const webpack = require('webpack');
const path = require('path');
const colors = require('colors');

//核心
//配置核心配置
class AngelCore {
  constructor(options) {
    this.webpackConfig = require(options.url);
    this.config = options.configUrl ? require(options.configUrl) : require(path.join(process.cwd(), 'config/config.default.js'));
    this.app = options.app;
  }
  
}

//处理webpack配置
class dealWebpackConfig extends AngelCore {
  constructor(options) {
    super(options);
    this.readConfig();
  }
  //处理webpack环境变量问题
  readConfig() {
    this.webpackConfig.mode = this.config.env.NODE_ENV;
    this.webpackConfig.plugins.push(new webpack.ProgressPlugin(this.process));
    this.compiler = webpack(this.webpackConfig); //webpack进度处理完成
    //导入webpack配置
    this.devMiddleware = require('koa-webpack-dev-middleware')(this.compiler, this.config.webpack.options);
    this.hotMiddleware = require('koa-webpack-hot-middleware')(this.compiler, this.config.webpack.options);
  }

  //处理webpack进度问题
  process(percentage, message, ...args) {
    console.log(`${parseInt(percentage * 100)}%`.green, message.yellow, ...args);
  }
}
//运行
class angelWebpack extends dealWebpackConfig {
  constructor(options) {
    super(options);
    this.runWebpack();
  }
  //运行webpack
  runWebpack() {
    this.app.use(this.devMiddleware);
    this.app.use(this.hotMiddleware);
  }
}

module.exports = angelWebpack;