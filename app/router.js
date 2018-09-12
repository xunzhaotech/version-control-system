/**
 * 
 * @param {angel 实例化对象} app 
 */

const html = require('./controller/home');
const business  = require('./controller/business');

module.exports = (app) => {
  let { router, config } = app;
  router.get('/',html);
  router.post('/system/api/issue/file',business.unpack);//
  // router.post('/system/api/issue/start',controllr.system.startIssue);//
  
}