const config = require('../../config/config.default');
const system = require('../service/system');
const path = require('path');
const { getPath } = require('../tool/index');


/**
 * @api {/system/api/issue/file}
 * @param {file}
 * @method {post}
 *   
 */
exports.unpack = async (ctx) => {
  const url = await getPath(ctx);

  ctx.body = await system.unpack(
    ctx.req,
    url
  );
}