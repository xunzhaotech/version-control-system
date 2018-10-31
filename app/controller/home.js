const config = require('../../config/config.default');
const path = require('path');

module.exports = async (ctx) => {

  const timestamp = new Date().getTime();
  let rootPath = `http://${ctx.host.split(":")[0]}:${config.listen.port}/dist`;
  if(config.env !== "production") {
    rootPath = `http://${ctx.host.split(":")[0]}:${config.webpack.listen.port}`;
  }
  await ctx.render('index', { timestamp, rootPath });
}