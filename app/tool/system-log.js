const { systemRAMInfo } = require('./model.js');
const config = require('../../config/config.default.js');
const os = require('os');
const path = require('path');

/**
 * [系统运行的日志]
 * @method
 * @return {[type]} [description]
 */
(function() {
  //系统每小时运行的内存信息
  function getRAM() {
    let data = {
      totalmem: os.totalmem(),//机器的总内存
      freemem: os.freemem(),//以整数的形式回空闲系统内存的字节数.
      hostName: os.hostname(),//操作系统的主机名
      time: new Date().getTime()
    }
    systemRAMInfo.create(data, (err, data) => {
      if(!err) {
        console.log('数据存储成功')
      }
    });
  }
  getRAM();
  setInterval(getRAM, 1000 * 60 * 60)
})()
