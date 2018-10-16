
const config = require('../../config/config.default');
const mongoose = require('mongoose');

mongoose.connect(`${config.mongodb.url}/${config.mongodb.name}`);

mongoose.connection.once("open", (err) => {
  if(!err) {
    console.log("数据库连接成功");
  }
})

mongoose.connection.once("close", (err) => {
  if(!err) {
    console.log("数据库连接已断开");
  }
})
