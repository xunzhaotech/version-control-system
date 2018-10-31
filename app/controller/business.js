const config = require('../../config/config.default');
const system = require('../service/system');
const { reg } = require('../service/user');
const { appList } = require('../service/app-list');
const { getServerInfo, getServerRAM } = require('../service/server-info');
const { getServerLog } = require('../service/server-log');
const path = require('path');
const { getPath } = require('../tool');


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
