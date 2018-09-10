const getPath = async ctx => {
  return ctx.url
    .split("/")
    .slice(2)
    .join("/");
};

exports.getPath = getPath;