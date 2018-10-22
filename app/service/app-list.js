const { appInfo } = require('../tool/model.js');
const config = require('../../config/config.default.js');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {*} ctx
 * @param {*} url
 */
exports.appList = async (ctx, url) => {
  let req = ctx.request;
  let params = req.query;
  let list = await appInfo.find({}, '-__v', {
    limit: Number(params.pageSize),
    skip: params.pageSize * (params.pageNum - 1)
  });

  return {
    code: 200,
    data: list,
    message: null
  };

}
