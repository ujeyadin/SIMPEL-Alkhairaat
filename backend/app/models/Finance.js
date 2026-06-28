const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Finance = sequelize.define('Finance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  reference_number: {
    type: DataTypes.STRING(50),
  },
  recorded_by: {
    type: DataTypes.INTEGER,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'finances',
});

module.exports = Finance;
