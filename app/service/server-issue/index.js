const { systemRAMInfo } = require('../../tool/model.js');
const config = require('../../../config/config.default.js');
const uploadFile = require('../common/upload');

/**
 * 
 * @param {*koa ctx} ctx 
 * @param {*访问路径} url 
 */
async function serverRelease(ctx, url) {
  let req = ctx.req;
  let request = ctx.request;
  //处理文件上传
  let fileObj = null;
  try {
    fileObj = await uploadFile(req);
  } catch (error) {
    return {
      code: 400,
      data: null,
      message: "发布失败，请重新发布"
    }
  }

}

module.exports = serverRelease;