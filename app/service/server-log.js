const { systemRAMInfo } = require('../tool/model.js');
const config = require('../../config/config.default.js');
const fs = require('fs');
const path = require('path');
const readline = require("linebyline");
const moment = require("moment");
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
	let time = params.time ? params.time : moment().format('YYYY-MM-DD');
	let appName = params.appName;
	let logsPath = path.join(process.cwd(), `logs`);
	let logName = null;
	let logInfo = Buffer.from('');
	let logData = null;
	if(type == 1) {
		logName = `angel.${time}.log`;
	} else {
		logName = `angel.log`;
	}

	if(type == 2) {
		function readLogs() {
			return new Promise((resolve) => {
				let rl = readline(path.join(process.cwd(), `logs/${logName}`));
				rl.on('line', (line, lineCount, byteCount) => {
					logInfo = Buffer.concat([logInfo, Buffer.from(`${line}\n`)]);
				})
				rl.on('end', function(data) {
					resolve(logInfo);
				});
			})
		}
		logData = await readLogs();
	}
  return {
    code: 200,
    data: logData.toString(),
    message: null
  }

}