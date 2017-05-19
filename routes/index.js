var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/collect', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var q = req.query;
  var data = {
    pid: q.id, // 项目id
    moduleName: q.n,
    errors: q.msg,
    appVersion: q.a,
    occurTime: q.t + '',
    lever: q.l,
    customData: q.data,
    ip: ip
  };
  console.log(data);
  res.sendStatus(200);
});

module.exports = router;
