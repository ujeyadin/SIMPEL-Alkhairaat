const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SIMPEL-Alkhairaat API is running' });
});

// API Routes (akan ditambahkan)
app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/users', require('./app/routes/user.routes'));
app.use('/api/schools', require('./app/routes/school.routes'));
app.use('/api/madrasah', require('./app/routes/madrasah.routes'));
app.use('/api/finance', require('./app/routes/finance.routes'));
app.use('/api/assets', require('./app/routes/asset.routes'));
app.use('/api/visitors', require('./app/routes/visitor.routes'));
app.use('/api/letters', require('./app/routes/letter.routes'));
app.use('/api/reports', require('./app/routes/report.routes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 SIMPEL-Alkhairaat API Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;