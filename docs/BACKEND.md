# SIMPEL-Alkhairaat Backend

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MySQL 8.0+ running
- npm atau yarn

### Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` dengan konfigurasi database Anda:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=simpel_alkhairaat
   JWT_SECRET=your_secret_key
   ```

3. **Run Database Migration**
   ```bash
   npm run migrate
   ```

4. **Seed Demo Data**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   npm run dev
   ```

Server akan berjalan di `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── app/
│   ├── config/          # Configuration files
│   ├── controllers/      # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   └── middleware/      # Custom middleware
├── database/
│   ├── migrate.js       # Database migration script
│   └── seed.js          # Database seeding script
├── server.js            # Main application file
├── package.json         # Dependencies
└── .env.example         # Environment template
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/status` - Change user status

### Schools
- `GET /api/schools` - Get all schools
- `GET /api/schools/:id` - Get school by ID
- `POST /api/schools` - Create new school
- `PUT /api/schools/:id` - Update school
- `DELETE /api/schools/:id` - Delete school
- `GET /api/schools/:id/statistics` - Get school statistics

### Finance
- `GET /api/finance` - Get all transactions
- `POST /api/finance` - Create transaction
- `PUT /api/finance/:id` - Update transaction
- `DELETE /api/finance/:id` - Delete transaction
- `GET /api/finance/report/summary` - Finance summary
- `GET /api/finance/report/monthly` - Monthly report

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `GET /api/assets/report/by-category` - Assets by category
- `GET /api/assets/report/by-location` - Assets by location

### Visitors
- `GET /api/visitors` - Get all visitors
- `POST /api/visitors` - Create visitor
- `PUT /api/visitors/:id` - Update visitor
- `PATCH /api/visitors/:id/checkout` - Checkout visitor
- `DELETE /api/visitors/:id` - Delete visitor
- `GET /api/visitors/report/by-category` - Visitors by category

### Letters
- `GET /api/letters` - Get all letters
- `POST /api/letters` - Create letter
- `PUT /api/letters/:id` - Update letter
- `PATCH /api/letters/:id/status` - Update letter status
- `DELETE /api/letters/:id` - Delete letter
- `GET /api/letters/report/incoming` - Incoming letters
- `GET /api/letters/report/outgoing` - Outgoing letters

### Reports
- `GET /api/reports/dashboard` - Dashboard summary
- `GET /api/reports/finance/summary` - Finance summary
- `GET /api/reports/school/profile` - School profile
- `GET /api/reports/assets/summary` - Assets summary
- `GET /api/reports/letters/summary` - Letters summary

## 🔐 Authentication

Gunakan JWT token dalam header:
```
Authorization: Bearer <token>
```

## 📦 Role-Based Access Control

- **Super Admin** - Akses semua fitur
- **Admin Pusat** - Monitor semua cabang
- **Admin Kabupaten** - Kelola cabang kabupaten
- **Admin Kecamatan** - Kelola pengurus cabang
- **Admin Sekolah** - Operasional sekolah
- **User** - Akses terbatas

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan MySQL server sudah running
- Cek konfigurasi `.env`
- Verifikasi username dan password database

### Port Already in Use
```bash
# Change port in .env
PORT=3002
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [JWT Authentication](https://jwt.io/)
