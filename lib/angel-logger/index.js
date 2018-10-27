const log4js = require('log4js');
const path = require('path');

log4js.configure({
	appenders: {
		everything: { 
			// type: 'file',
			type: 'dateFile',
			pattern: 'yyyy-MM-dd',
			// compress: true,
			daysToKeep: 30,
			keepFileExt: true,
			filename: path.join(process.cwd(),'logs/angel.log')
		}
	},
	categories: {
		default: { appenders: [ 'everything' ], level: 'debug' }
	}
});
let logger = log4js.getLogger();
class LoggerCore {
	constructor(options) {
		this.logger = logger;
		this.config = require(path.join(process.cwd(), 'config/config.default.js'));
	}
}

class LoggerInit extends LoggerCore {
	constructor() {
		super();
	}
}

module.exports = LoggerInit;