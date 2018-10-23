const log4js = require('log4js');
const path = require('path');

log4js.configure({
	appenders: {
    everything: { type: 'file', filename: path.join(process.cwd(),'logs/logtest.log') }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
});
const logger = log4js.getLogger();

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