const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  module: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  old_value: {
    type: DataTypes.JSON,
  },
  new_value: {
    type: DataTypes.JSON,
  },
  ip_address: {
    type: DataTypes.STRING(45),
  },
  user_agent: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'audit_logs',
});

module.exports = AuditLog;
