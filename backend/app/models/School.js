const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA', 'SMK'),
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(100),
  },
  district: {
    type: DataTypes.STRING(100),
  },
  sub_district: {
    type: DataTypes.STRING(100),
  },
  address: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  principal_name: {
    type: DataTypes.STRING(255),
  },
  student_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  teacher_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'schools',
});

module.exports = School;
