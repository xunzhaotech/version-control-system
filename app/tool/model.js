const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 用来创建Schema
*/


/**
 * [appInfo 应用列表信息]
 * @type {[type]}
 */
exports.appInfo = mongoose.model('appInfo', new Schema({
  version: String,
  name: String,
  createTime: String,
  pid: Number,
  status: Number
}));

/**
 * [systemRAMInfo 服务器内存信息]
 * @type {[type]}
 */
exports.systemRAMInfo = mongoose.model('systemRAMInfo', new Schema({
  totalmem: String,//机器的总内存
  freemem: String,//以整数的形式回空闲系统内存的字节数.
  hostName: String,//操作系统的主机名
  time: Number//时间
}));
