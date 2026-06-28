const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
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
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  unit: {
    type: DataTypes.STRING(50),
  },
  purchase_date: {
    type: DataTypes.DATE,
  },
  purchase_price: {
    type: DataTypes.DECIMAL(12, 2),
  },
  current_value: {
    type: DataTypes.DECIMAL(12, 2),
  },
  location: {
    type: DataTypes.STRING(100),
  },
  condition: {
    type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor'),
    defaultValue: 'good',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'disposal'),
    defaultValue: 'active',
  },
  asset_code: {
    type: DataTypes.STRING(50),
    unique: true,
  },
}, {
  tableName: 'assets',
});

module.exports = Asset;
