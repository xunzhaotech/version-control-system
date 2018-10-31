const path = require('path');
const angelWebpack = require('../lib/angel-webpack');
const AngelServer = require('../lib/server');
const cluster = require('cluster');

//使用mongodb
require('../app/tool/mongodb.js');
//记录系统运行日志
require('../app/tool/system-log.js')

//fork一个新的进程，用于启动webpack
if(cluster.isMaster) {
  new angelWebpack({
    url: path.join(process.cwd(), 'assets/webpack.config.js'), //webpack配置地址
    configUrl: path.join(process.cwd(), 'config/config.default.js') //默认读取config/config.default.js
  });

}

// 启动angel服务
if(cluster.isWorker) {
  new AngelServer({
    routerUrl: path.join(process.cwd(), 'app/router.js'),//路由地址
    configUrl: path.join(process.cwd(), 'config/config.default.js') //默认读取config/config.default.js
  })
}
  
