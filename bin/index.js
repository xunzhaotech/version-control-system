const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const KoaRouter = require('koa-router');
const koaNunjucks = require('koa-nunjucks-2');
const koaStatic = require('koa-static');
const colors = require('colors');
const dayjs = require('dayjs')
const router = new KoaRouter();
const logger = log4js.getLogger('cheese');
const config = require('../config/config.default');
const routerJs = require('../app/router');
const path = require('path');
let webpackConfig = require('../assets/webpack.config.js');
const webpack = require('webpack');

//处理webpack环境变量问题
webpackConfig.mode = config.env.NODE_ENV;
//配置日志
// log4js.configure('config/log4js.json');

/**
* 初始化config配置
*/

let port = config.listen.port;
//设置初始环境变量
app.env = config.env.NODE_ENV ? config.env.NODE_ENV : app.env;

//cookie签名验证
app.keys = config.keys ? config.keys : app.env;

//模板语法
app.use(koaNunjucks({
  ext: 'html',
  path: path.join(process.cwd(), 'app/views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

//访问日志
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method}`.green,` ${ctx.url} - `,`${rt}`.green);
});

// 响应时间
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//路由管理
routerJs({
  router,
  config,
  app
});

app.use(router.routes())
   .use(router.allowedMethods());
   
//管理日志
// app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
//文件根目录
config.root = config.root ? config.root : path.join(process.cwd(), 'app/static');
//默认静态配置
config.static = config.static ? config.static : {};
// 静态资源
app.use(koaStatic(config.root, config.static));

//webpack项目
const compiler = webpack(webpackConfig);

const devMiddleware = require('koa-webpack-dev-middleware')(compiler, config.webpack.options);
const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, config.webpack.options);
app.use(devMiddleware);
app.use(hotMiddleware);

// 启动服务器
app.listen(port, () => {
  console.log(`当前服务器已经启动,请访问`,`http://127.0.0.1:${port}`.green);
});
