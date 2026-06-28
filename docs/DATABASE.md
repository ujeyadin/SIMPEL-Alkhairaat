# Database Schema - SIMPEL-Alkhairaat

## 📊 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────┐
│                     USERS                           │
├─────────────────────────────────────────────────────┤
│ id (PK) | name | email | password | role           │
│ phone | school_id (FK) | is_active | last_login    │
└─────────────────────────────────────────────────────┘
         │                    │
         └────────────┬───────┘
                      │
         ┌────────────┴───────────┐
         │                        │
    ┌────▼─────────┐        ┌────▼──────────┐
    │   SCHOOLS    │        │  FINANCES     │
    ├──────────────┤        ├───────────────┤
    │ id (PK)      │        │ id (PK)       │
    │ name         │        │ school_id(FK) │
    │ code         │        │ type          │
    │ level        │        │ amount        │
    │ address      │        │ date          │
    │ principal    │        │ status        │
    └──────────────┘        └───────────────┘
         │
    ┌────┴─────────┬────────────┬──────────────┐
    │              │            │              │
┌───▼────┐    ┌───▼────┐  ┌───▼────┐  ┌───▼────┐
│ ASSETS │    │VISITORS│  │LETTERS │  │AUDIT   │
├────────┤    ├────────┤  ├────────┤  ├───LOGS─┤
│id (PK) │    │id (PK) │  │id (PK) │  │id (PK) │
│name    │    │name    │  │subject │  │user_id │
│category│    │phone   │  │status  │  │action  │
│quantity│    │purpose │  │type    │  │module  │
│value   │    │check_in│  │date    │  │old_val │
│status  │    │check_out   │recipient│new_val │
└────────┘    └────────┘  └────────┘  └────────┘
```

## 📋 Table Specifications

### USERS
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('super_admin', 'admin_pusat', 'admin_kabupaten', 'admin_kecamatan', 'admin_sekolah', 'user') DEFAULT 'user',
  school_id INT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL
);
```

### SCHOOLS
```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  level ENUM('TK', 'SD', 'SMP', 'SMA', 'SMK') NOT NULL,
  province VARCHAR(100),
  district VARCHAR(100),
  sub_district VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  principal_name VARCHAR(255),
  student_count INT DEFAULT 0,
  teacher_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### FINANCES
```sql
CREATE TABLE finances (
  id INT PRIMARY KEY AUTO_INCREMENT,
  school_id INT NOT NULL,
  transaction_date DATE NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  amount DECIMAL(12, 2) NOT NULL,
  reference_number VARCHAR(50),
  recorded_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_school_date (school_id, transaction_date)
);
```

### ASSETS
```sql
CREATE TABLE assets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  school_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  unit VARCHAR(50),
  purchase_date DATE,
  purchase_price DECIMAL(12, 2),
  current_value DECIMAL(12, 2),
  location VARCHAR(100),
  condition ENUM('excellent', 'good', 'fair', 'poor') DEFAULT 'good',
  status ENUM('active', 'inactive', 'disposal') DEFAULT 'active',
  asset_code VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  INDEX idx_school_category (school_id, category)
);
```

### VISITORS
```sql
CREATE TABLE visitors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  school_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  organization VARCHAR(255),
  purpose TEXT,
  visitor_category ENUM('internal', 'external', 'government', 'vendor', 'parent', 'other') DEFAULT 'external',
  check_in_time TIMESTAMP NOT NULL,
  check_out_time TIMESTAMP NULL,
  visited_department VARCHAR(100),
  host_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  INDEX idx_school_date (school_id, check_in_time)
);
```

### LETTERS
```sql
CREATE TABLE letters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  school_id INT NOT NULL,
  type ENUM('incoming', 'outgoing') NOT NULL,
  letter_number VARCHAR(50) UNIQUE,
  registration_number VARCHAR(50) UNIQUE,
  date DATE NOT NULL,
  sender VARCHAR(255),
  recipient VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  content LONGTEXT,
  status ENUM('received', 'processed', 'replied', 'archived', 'draft', 'sent') DEFAULT 'draft',
  attachment_url VARCHAR(255),
  disposition_to VARCHAR(100),
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_school_type (school_id, type),
  INDEX idx_status (status)
);
```

### AUDIT_LOGS
```sql
CREATE TABLE audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  module VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  old_value JSON,
  new_value JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_date (user_id, created_at),
  INDEX idx_module_action (module, action)
);
```

## 🔑 Indexes untuk Performance

```sql
-- User Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_school ON users(school_id);

-- School Indexes
CREATE INDEX idx_schools_code ON schools(code);
CREATE INDEX idx_schools_level ON schools(level);
CREATE INDEX idx_schools_district ON schools(district);

-- Finance Indexes
CREATE INDEX idx_finances_type ON finances(type);
CREATE INDEX idx_finances_category ON finances(category);

-- Asset Indexes
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_location ON assets(location);

-- Visitor Indexes
CREATE INDEX idx_visitors_category ON visitors(visitor_category);

-- Letter Indexes
CREATE INDEX idx_letters_date ON letters(date);
```

## 🔄 Data Relationships

1. **Users ↔ Schools**: One-to-Many
   - Satu sekolah bisa memiliki banyak pengguna
   - Admin Sekolah terhubung ke satu sekolah

2. **Schools ↔ Finances**: One-to-Many
   - Setiap transaksi keuangan milik satu sekolah

3. **Schools ↔ Assets**: One-to-Many
   - Setiap aset milik satu sekolah

4. **Schools ↔ Visitors**: One-to-Many
   - Setiap data pengunjung di satu sekolah

5. **Schools ↔ Letters**: One-to-Many
   - Setiap surat diterima/dikirim oleh satu sekolah

6. **Users ↔ AuditLogs**: One-to-Many
   - Setiap aktivitas tercatat oleh seorang user

## 📊 Data Retention Policy

- **Visitors**: Retain 1 tahun, archive setelahnya
- **Letters**: Retain 3 tahun, archive setelahnya
- **Finances**: Permanent record dengan audit trail
- **Assets**: Permanent record sampai disposal
- **Audit Logs**: Retain 2 tahun untuk compliance
