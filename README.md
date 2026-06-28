# 📊 SIMPEL-Alkhairaat
## Sistem Informasi Manajemen Pendidikan Lingkup Alkhairaat

Aplikasi web mandiri berbasis modern stack untuk manajemen data madrasah, laporan keuangan, aset, buku tamu, dan surat-menyurat dengan sistem multi-level admin.

---

## 🎯 Fitur Utama

### 1. **Dashboard & Analytics**
- Dashboard dengan widget statistik real-time
- Grafik visualisasi data
- Laporan ringkas per level admin

### 2. **Manajemen Data Madrasah**
- Data siswa, guru, dan staff
- Data infrastruktur sekolah
- Profil sekolah lengkap
- Kurikulum dan program pembelajaran

### 3. **Laporan Keuangan**
- Pencatatan pemasukan/pengeluaran
- Laporan kas bulanan/tahunan
- Manajemen SPP dan biaya operasional
- Audit trail lengkap

### 4. **Manajemen Aset**
- Inventaris aset sekolah
- Tracking kondisi aset
- Laporan aset per lokasi
- Depresiasi aset

### 5. **Buku Tamu**
- Pencatatan pengunjung
- Kategorisasi pengunjung
- Laporan kehadiran tamu
- Export data tamu

### 6. **Surat Masuk/Keluar**
- Input surat masuk dengan nomor registrasi
- Input surat keluar dengan nomor urut
- Tracking status surat
- Archive surat
- Laporan surat per periode

### 7. **Sistem Manajemen User**
- Multi-level administrator:
  - **Admin Pusat** - Monitor seluruh cabang
  - **Admin Kabupaten** - Kelola cabang di tingkat kabupaten
  - **Admin Kecamatan** - Kelola pengurus cabang
  - **Admin Sekolah** - Kelola data sekolah
- Role-based access control
- Audit log aktivitas

---

## 👥 Level Administrator

| Level | Akses | Fungsi |
|-------|-------|--------|
| **Admin Pusat** | Semua Data | Monitoring & Reporting Pusat |
| **Admin Kabupaten** | Data Kabupaten | Kelola Admin Kecamatan |
| **Admin Kecamatan** | Data Kecamatan | Kelola Admin Sekolah |
| **Admin Sekolah** | Data Sekolah | Operasional Harian |

---

## 🏗️ Struktur Proyek

```
SIMPEL-Alkhairaat/
├── backend/                 # REST API
│   ├── config/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── public/
│   └── .env.example
├── frontend/                # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── styles/
│   └── package.json
├── docs/                    # Dokumentasi
├── docker-compose.yml
└── package.json
```

---

## 🚀 Teknologi Stack

### Backend
- **Framework**: Express.js / Node.js
- **Database**: MySQL 8.0+
- **Authentication**: JWT
- **Validation**: Joi/Yup
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI / Ant Design
- **Charts**: Chart.js / ECharts
- **Form**: React Hook Form
- **HTTP Client**: Axios

### DevOps
- **Container**: Docker & Docker Compose
- **Version Control**: Git

---

## 📋 Setup & Installation

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### Docker Setup
```bash
docker-compose up -d
```

---

## 📞 Support & Contact

Untuk informasi lebih lanjut atau support teknis:
- Email: support@alkhairaat.id
- Documentation: `/docs`
- Issue Tracker: GitHub Issues

---

## 📄 License

© 2026 Alkhairaat. All rights reserved.