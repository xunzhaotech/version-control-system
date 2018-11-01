/**
 *
 * @param {angel 实例化对象} app
 */

const html = require('./controller/home');
const business  = require('./controller/business');

module.exports = (app) => {
  let { router, config } = app;
  router.get('/',html);
  router.post('/system/api/issue/file',business.serverRelease);
  router.post('/system/api/user/reg',business.reg);
  router.get('/system/api/app/list',business.getList)
  router.get('/system/api/server/info',business.getServerInfo)
  router.get('/system/api/server/RAM',business.getServerRAM)
  router.get('/system/api/server/log',business.getServerLog)
}
