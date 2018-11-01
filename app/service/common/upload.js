
'use strict';

const awaitWriteStream = require('await-stream-ready').write;
const fs = require('fs');
const path = require('path');
const formidable = require("formidable");
const { spawn, fork, exec } = require('child_process');
const sendToWormhole = require('stream-wormhole');
const config = require('../../../config/config.default');
const { appInfo } = require('../../tool/model.js');

async function uploadFile (req, url) {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) {
        reject(err);
      } else {
        resolve({ fields, files })
      }
    })
  });
}

module.exports = uploadFile;