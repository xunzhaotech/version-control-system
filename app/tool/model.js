const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 用来创建Schema
*/


// modelName 文档名称
exports.serverInfo = mongoose.model('serverInfo', new Schema({
  version: String,
  name: String,
  createTime: String,
  pid: Number,
  status: Number
}));