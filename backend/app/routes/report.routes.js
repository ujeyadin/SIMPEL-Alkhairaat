const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/dashboard', authenticate, reportController.getDashboardData);
router.get('/finance/summary', authenticate, reportController.getFinanceSummary);
router.get('/school/profile', authenticate, reportController.getSchoolProfile);
router.get('/assets/summary', authenticate, reportController.getAssetsSummary);
router.get('/letters/summary', authenticate, reportController.getLettersSummary);
router.get('/export/finance', authenticate, reportController.exportFinanceReport);
router.get('/export/asset', authenticate, reportController.exportAssetReport);
router.get('/export/visitors', authenticate, reportController.exportVisitorReport);

module.exports = router;
