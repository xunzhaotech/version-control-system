/**
 * 获取路径
 * @param ctx 上下文
 * 
 */
exports.getPath = async ctx => {
  return ctx.url
    .split("/")
    .slice(2)
    .join("/");
};
