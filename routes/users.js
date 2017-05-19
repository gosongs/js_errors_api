var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res) {
  console.log(req.body)
  models.users.findOne({where: {username: req.body.username}})
    .then(function (data) {
      if (data) {
        res.send({
          Code: 0,
          Message: '数据已存在'
        })
      } else {
        models.users.create({username: req.body.username, password: req.body.password})
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

router.get('/list', function (req, res) {
  models.users.findAll()
    .then(function (data) {
      res.send({
        Code: 0,
        Data: data || []
      })
    })
});

module.exports = router;
