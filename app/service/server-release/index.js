const { systemRAMInfo } = require('../../tool/model.js');
const config = require('../../../config/config.default.js');
const uploadFile = require('../common/upload');
const zlib = require('zlib');
const fs = require("fs");
const path = require("path");
const decompress = require('decompress');
const decompressTargz = require('decompress-targz');

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

    let name = fileObj.files.file.name;
    let file = fileObj.files.file;
    let fileName = name.split('_')[0];
    let version = name.split('_')[1].split('.gz')[0];
    version = `${version}${new Date().getTime()}`;
    let systemPath = path.join(process.cwd(), `system/${fileName}`);
    let versionPath = path.join(process.cwd(), `system/${fileName}/${version}`);

    //创建文件夹
    if(fs.existsSync(versionPath)) {

      return {
        code: 500,
        data: null,
        message: '当前版本已存在，请直接发布'
      }

    } else {
      if(!fs.existsSync(systemPath)) { 
        fs.mkdirSync(systemPath);
        fs.mkdirSync(versionPath);
      } else {
        fs.mkdirSync(versionPath);
      }
    }
    //生成文件

    const stream = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(path.join(versionPath, `${fileName}.gz`));
    await awaitWriteStream(stream.pipe(writeStream));
    decompress(`${versionPath}\${fileName}.gz`, 'dist', {
      plugins: [
        decompressTargz()
      ]
    }).then(() => {
        console.log('文件解压完成');
    });
  } catch (error) {
    return {
      code: 400,
      data: null,
      message: "发布失败，请重新发布"
    }
  }

}

module.exports = serverRelease;