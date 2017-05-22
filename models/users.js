"use strict";

module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define("users",
    {
      // 自增 id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // 用户名
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // 密码
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // 昵称
      nickname: {
        type: DataTypes.STRING
      },
      // 邮箱
      email: {
        type: DataTypes.STRING
      },
      // 是否禁用, 默认 false
      forbid: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      // 登录 ip 历史
      hisIps: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
      }
    },
    {
      classMethods: {
        associate: function (models) {
          // User.hasMany(models.Task)
        }
      }
    }
  );

  return users;
};
