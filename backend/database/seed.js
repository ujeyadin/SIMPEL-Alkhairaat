const sequelize = require('../config/database');
const User = require('../models/User');
const School = require('../models/School');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    console.log('\n🌱 Memulai seeding data...');

    // Create Admin Pusat
    await User.create({
      name: 'Admin Pusat Alkhairaat',
      email: 'admin@alkhairaat.id',
      password: 'admin123',
      phone: '081234567890',
      role: 'admin_pusat',
      is_active: true,
    });

    // Create Sample Schools
    const schools = await Promise.all([
      School.create({
        name: 'MI Alkhairaat Pusat',
        code: 'MI-001',
        level: 'SD',
        province: 'Sulawesi Tengah',
        district: 'Palu',
        sub_district: 'Palu Barat',
        address: 'Jl. Sultan Hasanuddin No. 1, Palu',
        phone: '0451-1234567',
        email: 'mi.alkhairaat@edu.id',
        principal_name: 'Dr. H. Abubakar, M.Pd',
        student_count: 450,
        teacher_count: 25,
      }),
      School.create({
        name: 'SMP Alkhairaat',
        code: 'SMP-001',
        level: 'SMP',
        province: 'Sulawesi Tengah',
        district: 'Palu',
        sub_district: 'Palu Timur',
        address: 'Jl. Ahmad Yani No. 25, Palu',
        phone: '0451-2345678',
        email: 'smp.alkhairaat@edu.id',
        principal_name: 'H. Muhammad Hasan, S.Pd, M.Pd',
        student_count: 350,
        teacher_count: 20,
      }),
    ]);

    // Create School Admins
    await Promise.all([
      User.create({
        name: 'Admin MI Alkhairaat',
        email: 'admin.mi@alkhairaat.id',
        password: 'admin123',
        phone: '081345678901',
        role: 'admin_sekolah',
        school_id: schools[0].id,
        is_active: true,
      }),
      User.create({
        name: 'Admin SMP Alkhairaat',
        email: 'admin.smp@alkhairaat.id',
        password: 'admin123',
        phone: '081456789012',
        role: 'admin_sekolah',
        school_id: schools[1].id,
        is_active: true,
      }),
    ]);

    console.log('✅ Seeding data berhasil!');
    console.log('\n📝 Akun Demo:');
    console.log('   Email: admin@alkhairaat.id');
    console.log('   Password: admin123');
    console.log('   Role: Admin Pusat\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seed();
