# SIMPEL-Alkhairaat Frontend

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm atau yarn

### Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   REACT_APP_API_URL=http://localhost:3001
   REACT_APP_APP_NAME=SIMPEL-Alkhairaat
   REACT_APP_VERSION=1.0.0
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

Aplikasi akan membuka di `http://localhost:3000`

## 📁 Project Structure

```
frontend/src/
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── SchoolManagement.jsx
│   ├── FinanceManagement.jsx
│   ├── AssetManagement.jsx
│   ├── VisitorManagement.jsx
│   ├── LetterManagement.jsx
│   └── UserManagement.jsx
├── layouts/            # Layout components
│   └── Layout.jsx
├── components/         # Reusable components
├── services/           # API services
├── hooks/              # Custom React hooks
├── store/              # Redux store
├── styles/             # Global styles
├── App.jsx             # Main app component
└── index.jsx           # Entry point
```

## 🎨 Features

### Pages

**Login Page**
- Form login dengan validasi
- JWT token management
- Demo credentials display

**Dashboard**
- Statistik real-time
- Chart visualisasi data
- Ringkasan keuangan
- Widget overview

**School Management**
- CRUD operasi sekolah
- Filter dan search
- Multi-level admin view

**Finance Management**
- Pencatatan transaksi
- Laporan pemasukan/pengeluaran
- Summary dashboard
- Export data

**Asset Management**
- Inventaris aset
- Tracking kondisi
- Laporan per kategori/lokasi
- Depreciation tracking

**Visitor Management (Buku Tamu)**
- Check-in/out tracking
- Kategori pengunjung
- Laporan pengunjung
- Export ke PDF/Excel

**Letter Management**
- Surat masuk/keluar
- Nomor registrasi otomatis
- Status tracking
- Disposisi letter
- Archive management

**User Management**
- CRUD pengguna
- Role assignment
- Status management
- Multi-level access control

## 🎯 Available Scripts

### `npm start`
Run aplikasi dalam development mode

### `npm run build`
Build aplikasi untuk production

### `npm test`
Run test suite

### `npm run eject`
Eject configuration (tidak reversible)

## 🔐 Authentication Flow

1. User login dengan email & password
2. Server return JWT token
3. Token disimpan di localStorage
4. Token dikirim di setiap request (Authorization header)
5. Protected routes mengecek token validity

## 🎨 UI/UX Design

- **Material-UI (MUI)** untuk components
- **Responsive Design** untuk mobile & desktop
- **Dark/Light Theme** support (configurable)
- **Recharts** untuk data visualization
- **Professional Colors**: Biru (#1976D2) sebagai primary

## 📱 Responsive Breakpoints

- **xs**: 0px - 600px (Mobile)
- **sm**: 600px - 960px (Tablet)
- **md**: 960px - 1280px (Desktop)
- **lg**: 1280px - 1920px (Large Desktop)
- **xl**: 1920px+ (Extra Large)

## 🚀 Build for Production

```bash
npm run build
```

Hasil build tersimpan di folder `build/` dan siap di-deploy.

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Axios HTTP Client](https://axios-http.com/)
- [Recharts](https://recharts.org/)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Set custom port
PORT=3001 npm start
```

### API Connection Error
- Verifikasi backend running di `http://localhost:3001`
- Cek REACT_APP_API_URL di `.env`
- Buka browser console untuk error details

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 Deployment

Contoh deployment ke hosting:

### Deploy ke Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Deploy ke Vercel
```bash
npm install -g vercel
vercel --prod
```
