const config = require('../../config/config.default');
const system = require('../service/system');
const { reg } = require('../service/user');
const { appList } = require('../service/app-list');
const path = require('path');
const { getPath } = require('../tool');


/**
 * @api /system/api/issue/file
 * @param {file}
 * @method post
 *   
 */
exports.unpack = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await system.unpack(
    ctx.req,
    url
  );
}

/**
 * @api /system/api/user/reg
 * @param {Func} ctx 
 * @method POST
 */
exports.reg = async (ctx) => {
  const url = await getPath(ctx);

  ctx.body = await reg(
    ctx.req,
    url
  );
}

/**
 * @api /system/api/app/list
 * @param {*上下文} ctx 
 */
exports.getList = async (ctx) => {
  const url = await getPath(ctx);
  ctx.body = await appList(
    ctx,
    url
  );
}