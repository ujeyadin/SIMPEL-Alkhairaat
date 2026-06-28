const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, financeController.getAllFinances);
router.get('/:id', authenticate, financeController.getFinanceById);
router.post('/', authenticate, authorize('admin_sekolah', 'admin_kecamatan', 'admin_pusat'), financeController.createFinance);
router.put('/:id', authenticate, authorize('admin_sekolah', 'admin_kecamatan'), financeController.updateFinance);
router.delete('/:id', authenticate, authorize('admin_sekolah', 'admin_pusat'), financeController.deleteFinance);
router.get('/report/summary', authenticate, financeController.getFinanceSummary);
router.get('/report/monthly', authenticate, financeController.getMonthlyReport);

module.exports = router;
