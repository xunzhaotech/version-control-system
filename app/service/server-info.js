const { systemRAMInfo } = require('../tool/model.js');
const config = require('../../config/config.default.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * [getServerInfo description]
 * @method getServerInfo
 * @param  {[type]}      ctx [koa-router ctx]
 * @param  {[type]}      url [访问路径]
 * @return {Promise}         [服务器基本信息]
 */
exports.getServerInfo = async (ctx, url) => {
  let req = ctx.request;
  let data = {
    arch: os.arch(),//操作系统CPU架构
    cpus: os.cpus(),//CPU 内核的信息
    totalmem: os.totalmem(),//机器的总内存
    freemem: os.freemem(),//以整数的形式回空闲系统内存的字节数.
    hostName: os.hostname(),//操作系统的主机名
    network: os.networkInterfaces(),//包含只有被赋予网络地址的网络接口
    platform: os.platform()//Node.js编译时的操作系统平台
  }
  return {
    code: 200,
    data,
    message: null
  }

}

/**
 * [getServerRAM ]
 * @method getServerRAM
 * @param  {[type]}     ctx [description]
 * @param  {[type]}     url [description]
 * @return {Promise}        [description]
 */
exports.getServerRAM = async (ctx, url) => {
  let req = ctx.request;
  let params = req.query;
  let data = await systemRAMInfo.find({}, '-__v', {
    limit: Number(params.pageSize),
    skip: params.pageSize * (params.pageNum - 1)
  });
  return {
    code: 200,
    data,
    message: null
  }
}
