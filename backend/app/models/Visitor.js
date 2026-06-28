const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Visitor = sequelize.define('Visitor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  organization: {
    type: DataTypes.STRING(255),
  },
  purpose: {
    type: DataTypes.TEXT,
  },
  visitor_category: {
    type: DataTypes.ENUM('internal', 'external', 'government', 'vendor', 'parent', 'other'),
    defaultValue: 'external',
  },
  check_in_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out_time: {
    type: DataTypes.DATE,
  },
  visited_department: {
    type: DataTypes.STRING(100),
  },
  host_name: {
    type: DataTypes.STRING(255),
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'visitors',
});

module.exports = Visitor;
