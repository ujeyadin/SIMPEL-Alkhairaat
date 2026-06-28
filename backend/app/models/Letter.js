const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Letter = sequelize.define('Letter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('incoming', 'outgoing'),
    allowNull: false,
  },
  letter_number: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  registration_number: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING(255),
  },
  recipient: {
    type: DataTypes.STRING(255),
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.LONGTEXT,
  },
  status: {
    type: DataTypes.ENUM('received', 'processed', 'replied', 'archived', 'draft', 'sent'),
    defaultValue: 'draft',
  },
  attachment_url: {
    type: DataTypes.STRING(255),
  },
  disposition_to: {
    type: DataTypes.STRING(100),
  },
  notes: {
    type: DataTypes.TEXT,
  },
  created_by: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'letters',
});

module.exports = Letter;
