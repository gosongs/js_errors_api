"use strict";

// 定义 modal
module.exports = function (sequelize, DataTypes) {
  var projects = sequelize.define("projects",
    {
      // 自增id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // 唯一项目id
      pid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      // 项目名
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // 项目备注
      info: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // 所属用户
      ownerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // 是否启用, 默认false
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

  return projects;
};
