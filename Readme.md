# 基于koa和egg的后台版本控制系统

# 前端需求：

* 1、提供文件上传

* 2、提供当前服务器实时运行日志

* 3、提供Linux系统参数

* 4、提供历史日志服务

    可以自定义服务日志

* 6、当前物理机的状态

* 7、版本回退

* 8、使用markfile进行前端脚手架安装、打包。

![数据统计](https://github.com/baiyuze/version-control-system/blob/master/image/1.png)
![应用列表](https://github.com/baiyuze/version-control-system/blob/master/image/2.png)
![应用部署](https://github.com/baiyuze/version-control-system/blob/master/image/3.png)
![日志服务](https://github.com/baiyuze/version-control-system/blob/master/image/4.png)


# 后端需求：

## 文件解析：

* 1、解析当前文件，name、版本、时间。

* 2、解压压缩包。children_process.exec()。通过命名，依次放入当前服务根目录 cluster-> name->version

* 3、部署： 运行命令，启动服务器。端口未占用情况下随机。

* 4、通知前端部署成功	
  egg服务器日志生产环境打印日志-


## 接口

``` javascript
/**
 * [unpack 文件上传，解压]
 * @method unpack
 * @param  {[type]}  ctx [koa-router]
 * @return {Promise}     [description]
 */
exports.unpack = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await system.unpack(
    ctx.req,
    url
  );
}


/**
 * [reg 注册]
 * @method reg
 * @param  {[type]}  ctx [koa-router]
 * @return {Promise}     [description]
 */
exports.reg = async (ctx) => {
  const url = await getPath(ctx);

  ctx.body = await reg(
    ctx.req,
    url
  );
}

/**
 * [getList 获取应用列表数据]
 * @method getList
 * @param  {[type]}  ctx [koa-router]
 * @return {Promise}     [description]
 */
exports.getList = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await appList(
    ctx,
    url
  );
}

/**
 * [getServerInfo 获取服务器信息】]
 * @method getServerInfo
 * @param  {[type]}      ctx [koa-router]
 * @return {Promise}         [description]
 */
exports.getServerInfo = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await getServerInfo(
    ctx,
    url
  );
}

/**
 * [getServerRAM 获取服务器每小时内存信息]
 * @method getServerRAM
 * @param  {[type]}     ctx [koa-router]
 * @return {Promise}        [description]
 */
exports.getServerRAM = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await getServerRAM(
    ctx,
    url
  );
}

/**
 * [getServerRAM 获取服务器日志]
 * @method getServerLog
 * @param  {[type]}     ctx [koa-router]
 * @return {Promise}        [description]
 */
exports.getServerLog = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await getServerLog(
    ctx,
    url
  );
}

```