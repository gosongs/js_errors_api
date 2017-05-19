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
      // 错误id
      eid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      // 错误所属项目id
      pid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // 错误所属模块名
      moduleName: {
        type: DataTypes.STRING
      },
      // 错误信息
      errors: {
        type: DataTypes.STRING
      },
      // 错误级别
      lever: {
        type: DataTypes.STRING
      },
      // 用户UA
      appVersion: {
        type: DataTypes.STRING
      },
      // 发生时间
      occurTime: {
        type: DataTypes.STRING
      },
      // 自定义数据
      customData: {
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
