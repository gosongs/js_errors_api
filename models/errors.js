"use strict";

module.exports = function (sequelize, DataTypes) {
  var errors = sequelize.define("errors",
    {
      // 自增id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // 错误所属的项目
      key: {
        type: DataTypes.STRING,
        allowNull: false
      },
      platform: {
        type: DataTypes.STRING
      },
      // 错误名, 若为空的话, 则视为上报的错误没有意义, 不存储
      errName: {
        type: DataTypes.STRING
      },
      // 错误发生的地址
      errUrl: {
        type: DataTypes.STRING
      },
      // 错误行号
      errLine: {
        type: DataTypes.INTEGER
      },
      // 错误发生次数
      errTime: {
        type: DataTypes.INTEGER
      },
      // 详细错误信息
      errStack: {
        type: DataTypes.STRING
      },
      // 浏览器类型
      browserType: {
        type: DataTypes.STRING
      },
      // 浏览器版本
      browserVersion: {
        type: DataTypes.STRING
      },
      // 状态 // 已解决 closed | 未解决 open | 忽略 ignore | 急需解决 immediately
      status: {
        type: DataTypes.STRING
      },
      // 用户UA
      uA: {
        type: DataTypes.STRING
      },
      // 自定义数据
      userData: {
        type: DataTypes.STRING
      },
      // ip
      ip: {
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

  return errors;
};
