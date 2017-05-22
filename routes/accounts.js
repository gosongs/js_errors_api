var models = require('../models');
var express = require('express');
var router = express.Router();
var uuid = require('../utils/uuid');

router.post('/register', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  var hisIps = [];
  hisIps.push(ip);

  var newData = {
    uid: uuid(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    hisIps: JSON.stringify(hisIps)
  };

  models.users.findOne({where: {username: req.body.username}})
    .then(function (data) {
      if (data) {
        res.send({
          Code: 404,
          Message: '数据已存在'
        })
      } else {
        models.users.create(newData)
          .then(function (data) {
            if (data) {
              res.send({
                Code: 0,
                Message: 'Success'
              })
            }
          })
      }
    });
});

router.post('/login', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  var token = uuid();
  models.users.findOne({where: {username: req.body.username}})
    .then(function (curUser) {
      if (curUser) {
        console.log(curUser.dataValues)
        if (curUser.dataValues.enable) {
          res.send({
            Code: 404,
            Message: '用户被禁用'
          })
        } else if (curUser.dataValues.password !== req.body.password) {
          res.send({
            Code: 404,
            Message: '密码错误'
          })
        } else {
          var hisIps = JSON.parse(curUser.dataValues.hisIps);
          if (hisIps.indexOf(ip) === -1) {
            hisIps.push(ip)
          }
          curUser.updateAttributes({
            token: token,
            hisIps: JSON.stringify(hisIps)
          });
          res.send({
            Code: 0,
            Data: {
              token: token
            }
          });
        }
      } else {
        res.send({
          Code: 404,
          Message: '用户不存在'
        })
      }
    });
});

module.exports = router;
