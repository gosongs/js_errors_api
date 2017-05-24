var models = require('../models');
var express = require('express');
var router = express.Router();
var uuid = require('../utils/uuid');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/collect', function (req, res) {
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var q = req.query;
  if (!q.errName) {
    res.sendStatus(200);
  } else {
    models.errors.findOne({
      where: {
        key: q.key,
        errName: q.errName,
        browserType: q.broType,
        browserVersion: q.broVer
      }
    })
      .then(function (curErr) {
        // 视为同一错误
        if (curErr) {
          // 更新 errTime
          var curTime = curErr.dataValues.errTime;
          curErr.updateAttributes({
            errTime: curTime + 1
          });
          res.sendStatus(200);
        } else {
          // 创建
          var newErr = {
            key: q.key,
            platform: q.platform,
            errName: q.errName,
            errUrl: q.errUrl,
            errLine: q.errLine,
            errTime: 1, // 默认为1
            errStack: q.errStack,
            browserType: q.broType,
            browserVersion: q.broVer,
            uA: q.uA,
            userData: q.userData,
            ip: ip,
            status: 'open'
          };
          models.errors.create(newErr)
            .then(function (_) {
              res.sendStatus(200); // 无论成功与否, 都返回正确的请求结果
            })
        }
      })
  }
});

module.exports = router;
