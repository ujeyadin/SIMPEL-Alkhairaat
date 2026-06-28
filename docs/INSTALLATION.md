# SIMPEL-Alkhairaat - Setup & Installation Guide

## 📋 Persyaratan Sistem

### Minimum Requirements
- **OS**: Linux, macOS, atau Windows
- **Node.js**: v16 atau lebih tinggi
- **npm**: v7 atau lebih tinggi
- **MySQL**: v8.0 atau lebih tinggi
- **RAM**: 2GB minimum
- **Disk Space**: 2GB untuk instalasi

### Recommended Specifications
- **OS**: Ubuntu 20.04 LTS atau lebih baru
- **Node.js**: v18 LTS
- **MySQL**: v8.0.33
- **RAM**: 4GB+
- **Disk Space**: 5GB+

## 🔧 Instalasi Database

### Ubuntu/Debian
```bash
# Install MySQL Server
sudo apt-get update
sudo apt-get install mysql-server

# Start MySQL Service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL Installation
sudo mysql_secure_installation
```

### macOS
```bash
# Install dengan Homebrew
brew install mysql

# Start MySQL Service
brew services start mysql

# Secure Installation
mysql_secure_installation
```

### Windows
1. Download MySQL Installer dari https://dev.mysql.com/downloads/mysql/
2. Run installer dan ikuti wizard
3. Configure MySQL Server (port 3306)
4. Start MySQL Service

## 🚀 Instalasi Aplikasi

### 1. Clone Repository
```bash
git clone https://github.com/ujeyadin/SIMPEL-Alkhairaat.git
cd SIMPEL-Alkhairaat
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env dengan konfigurasi database Anda
# Database credentials sesuai instalasi MySQL
```

**Contoh .env:**
```env
NODE_ENV=development
PORT=3001
APP_NAME=SIMPEL-Alkhairaat

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=simpel_alkhairaat

JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d

UPLOAD_DIR=uploads/
MAX_FILE_SIZE=5242880
```

### 3. Database Migration & Seeding

```bash
# Buat database schema
npm run migrate

# Isi data demo
npm run seed
```

### 4. Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend akan berjalan di: **http://localhost:3001**

### 5. Setup Frontend (Terminal Baru)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Pastikan REACT_APP_API_URL sesuai dengan backend URL
```

### 6. Start Frontend Development Server

```bash
npm start
```

Frontend akan membuka di: **http://localhost:3000**

## 🐳 Docker Installation (Optional)

Alternatif install menggunakan Docker & Docker Compose:

### Prerequisites
- Docker installed
- Docker Compose v2.0+

### Setup dengan Docker

```bash
# Navigate ke project root
cd SIMPEL-Alkhairaat

# Start semua services
docker-compose up -d

# Verify services running
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: localhost:3306

### Docker Troubleshooting

```bash
# Rebuild images
docker-compose build --no-cache

# View service logs
docker-compose logs backend
docker-compose logs frontend

# Access MySQL inside container
docker-compose exec mysql mysql -u simpel_user -p
```

## 📝 Demo Credentials

Setelah seeding data, gunakan kredensial berikut untuk login:

**Admin Pusat**
```
Email: admin@alkhairaat.id
Password: admin123
Role: Admin Pusat
```

**Admin Sekolah MI**
```
Email: admin.mi@alkhairaat.id
Password: admin123
Role: Admin Sekolah
```

**Admin Sekolah SMP**
```
Email: admin.smp@alkhairaat.id
Password: admin123
Role: Admin Sekolah
```

## ✅ Verification Checklist

- [ ] Node.js terinstall: `node -v`
- [ ] npm terinstall: `npm -v`
- [ ] MySQL running: `mysql -u root -p`
- [ ] Backend running: `http://localhost:3001/api/health`
- [ ] Frontend running: `http://localhost:3000`
- [ ] Login berhasil dengan demo credentials
- [ ] Dashboard menampilkan data
- [ ] Dapat membuat/edit/hapus data

## 🚀 Next Steps

1. **Customize Branding**: Edit logo dan warna di `frontend/src`
2. **Configure Email**: Setup SMTP di `backend/.env`
3. **Enable 2FA**: Implement two-factor authentication
4. **Setup Backup**: Configure automated database backups
5. **Deploy ke Production**: Follow deployment guide

## 🆘 Troubleshooting

### Cannot connect to database
```bash
# Check MySQL service
sudo systemctl status mysql  # Linux
brew services list          # macOS

# Verify credentials in .env
mysql -h localhost -u root -p
```

### Port already in use
```bash
# Kill process on port
lsof -ti:3001 | xargs kill -9  # Kill port 3001
lsof -ti:3000 | xargs kill -9  # Kill port 3000
```

### Dependencies conflict
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
- Verifikasi backend URL di `.env` frontend
- Check CORS configuration di backend

## 📞 Support

Untuk bantuan lebih lanjut:
- 📧 Email: support@alkhairaat.id
- 📖 Dokumentasi: `/docs`
- 🐛 Report Bug: GitHub Issues

## 📄 License

© 2026 Alkhairaat. All rights reserved.
