# Panduan Pengembangan SIMPEL-Alkhairaat

## Persiapan Lingkungan Pengembangan

### 1. Clone Repository
```bash
git clone https://github.com/ujeyadin/SIMPEL-Alkhairaat.git
cd SIMPEL-Alkhairaat
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi lokal Anda
npm run dev
```

### 3. Setup Frontend (Terminal baru)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

## Struktur Database

Database akan dibuat otomatis saat pertama kali. Tabel utama:

- `users` - Data pengguna dan admin
- `schools` - Data sekolah/cabang
- `students` - Data siswa
- `teachers` - Data guru
- `finances` - Laporan keuangan
- `assets` - Inventaris aset
- `visitors` - Data pengunjung (buku tamu)
- `letters` - Surat masuk/keluar
- `audit_logs` - Log aktivitas

## Konvensi Kode

### Backend (Express.js)
- Gunakan ES6+ syntax
- Struktur folder: routes -> controllers -> models
- Error handling dengan try-catch
- Validasi input dengan Joi

### Frontend (React)
- Functional components dengan hooks
- Redux untuk state management
- Folder: pages -> components -> services
- CSS Modules untuk styling

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Deployment

Gunakan Docker Compose:
```bash
docker-compose up -d
```

Semua service akan berjalan dalam container terpisah.