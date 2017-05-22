var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res) {
  if (!req.body.key || !req.body.name || !req.body.uid) {
    res.send({
      Code: 404,
      Message: '数据不完整'
    })
  } else {
    var newData = {
      key: req.body.key,
      name: req.body.name,
      type: req.body.type,
      info: req.body.info,
      uid: req.body.uid,
      status: req.body.status
    };

    models.projects.create(newData)
      .then(function (data) {
        if (data) {
          res.send({
            Code: 0,
            Message: 'Success'
          })
        } else {
          res.send({
            Code: 404,
            Message: '出错了'
          })
        }
      })
  }
});

router.post('/list', function (req, res) {
  if (!req.body.uid) {
    res.send({
      Code: 404,
      Message: '数据不完整'
    })
  } else {
    models.projects.findAll({
      where: {
        uid: req.body.uid
      }
    })
      .then(function (data) {
        res.send({
          Code: 0,
          Data: data || []
        })
      })
  }
});

router.post('/remove', function (req, res) {
  if (!req.body.uid || !req.body.key) {
    res.send({
      Code: 404,
      Message: '数据不完整'
    })
  } else {
    models.projects.destroy({
      where: {
        uid: req.body.uid,
        key: req.body.key
      }
    })
      .then(function (u) {
        if (u) {
          models.errors.destroy({
            where: {
              key: req.body.key
            }
          })
            .then(function (_) {
              if (_) {
                res.send({
                  Code: 0,
                  Message: 'SUCCESS'
                })
              }
            });
        } else {
          res.send({
            Code: 404,
            Message: '出错了'
          })
        }
      }, function (err) {
        console.log(err);
        res.send({
          Code: 404,
          Message: '出错了'
        })
      })
  }
});

module.exports = router;
