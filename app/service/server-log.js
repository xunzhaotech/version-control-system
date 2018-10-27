const { systemRAMInfo } = require('../tool/model.js');
const config = require('../../config/config.default.js');
const fs = require('fs');
const path = require('path');
const readline = require("linebyline");

/**
 * [getServerInfo 服务器各项日志]
 * @method getServerLog
 * @param  {[type]}      ctx [koa-router ctx]
 * @param  {[type]}      url [访问路径]
 * @return {Promise}         [服务器基本信息]
 * @api type 1 历史日志, 2 在线日志
 * @api time type= 1时存在
 */
exports.getServerLog= async (ctx, url) => {
  let req = ctx.request;
	let params = req.query;
	let type = params.type;
	let time = params.time;
	let appName = params.appName;
	let logsPath = path.join(process.cwd(), `logs`);
	let dirs = fs.readdirSync(logsPath);
	if(type == 1) {
		
		// const readliner = readline.createInterface({
		//     input: fs.createReadStream(path.join(process.cwd(), './filename')),
		// });

		// readliner.on('line', function(chunk) {
		// 	//处理每一行数据
		// });

		// readliner.on('close', function() {
		// 	//文件读取结束
		// });

	}
  return {
    code: 200,
    data: null,
    message: null
  }

}