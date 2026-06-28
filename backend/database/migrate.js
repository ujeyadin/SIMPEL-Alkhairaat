const sequelize = require('../config/database');
const User = require('../models/User');
const School = require('../models/School');
const Finance = require('../models/Finance');
const Asset = require('../models/Asset');
const Visitor = require('../models/Visitor');
const Letter = require('../models/Letter');
const AuditLog = require('../models/AuditLog');

const migrate = async () => {
  try {
    console.log('\n🔄 Memulai migrasi database...');
    
    await sequelize.sync({ alter: true });
    
    console.log('✅ Migrasi database berhasil!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error migrasi database:', error);
    process.exit(1);
  }
};

migrate();
