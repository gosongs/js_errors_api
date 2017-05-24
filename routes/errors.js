var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.post('/list', function (req, res) {
  if (!req.body.key || !req.body.uid) {
    res.send({
      Code: 404,
      Message: '数据不完整'
    })
  } else {
    var pageNow = req.body.pageNow || 1;
    var pageSize = req.body.pageSize || 20;
    models.errors.findAndCountAll({
      where: {
        key: req.body.key
      },
      order: [
        ['updatedAt', 'DESC'] // 按照更新时间降序
      ],
      offset: (pageNow - 1) * pageSize,
      limit: Number(pageSize)
    })
      .then(function (data) {
        res.send({
          Code: 0,
          Data: {
            count: data.count,
            rows: data.rows
          }
        })
      })
  }
});

router.post('/count', function (req, res) {
  models.errors.findAll({
    where: {
      key: req.body.key
    }
  }).then(function (data) {
    var dataAll = 0; // 所有bug数据
    var bV = {};
    var bV_percent = []; // 存储浏览器分布, 百分比数据
    var todayCount = 0; // 今天发生的bug数据
    var today = moment().format('YYYY-MM-DD'); // 2017-05-24
    var weeks = {};
    for (var i = 1; i <= 7; i++) {
      var d = moment().startOf('week').add('days', i).format('YYYY-MM-DD'); // 2017-05-24
      weeks[d] = {
        errTime: 0
      };
    }

    var statusCount = { // 安装状态分组
      open: 0,
      closed: 0,
      ignore: 0,
      immediately: 0
    };
    if (data.length) {
      data.map(function (_, i) {
        dataAll += _.errTime;
        var upAt = moment(_.updatedAt).format('YYYY-MM-DD'); // 将数据库时间转换为 2017-09-01 的格式
        if (upAt === today) {
          todayCount += _.errTime;
        }

        for (var k in weeks) {
          if (upAt === k) {
            weeks[k]['errTime'] += _.errTime
          }
        }

        if (_.status) {
          statusCount[_.status] += _.errTime;
        }

        if (bV[_.browserType] === undefined) {
          bV[_.browserType] = _.errTime;
        } else {
          bV[_.browserType] += _.errTime;
        }
      })
    }

    for (var k in bV) {
      bV_percent.push([k, Number((bV[k] / dataAll).toFixed(2))]);
    }

    console.log(weeks)
    res.send({
      Code: 0,
      Data: {
        today: todayCount,
        all: dataAll,
        browserVersion: bV_percent,
        status: statusCount,
        weeks: weeks
      }
    })
  })
});

module.exports = router;
