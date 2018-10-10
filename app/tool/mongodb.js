
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.default');
const assert = require('assert');
const mongoose = require('mongoose');


module.exports = (callback) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(`${config.mongodb.url}/${config.mongodb.name}`); 
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接失败'));
    db.once('open', function() {
      console.log('已连接')
      // resolve(mongoose);
      // //创建一个场景
      let kittySchema = mongoose.Schema({ name: String });
      kittySchema.methods.speak = () => {
        this.word = '我是一只猫';
      }
      let Kitten = mongoose.model('Kitten', kittySchema);
      var fluffy = new Kitten({ name: 'fluffy' });
      fluffy.save((err, fluffy) => {
        if(err) {
          console.log('保存到数据库失败',err);
        }
        fluffy.speak();
    
      })
      // Kitten.find(function (err, kittens) {
      //   if (err) return console.error(err);
      //   console.log(kittens);
      // })
    });
  })
  

} 


