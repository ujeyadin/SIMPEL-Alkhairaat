const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, schoolController.getAllSchools);
router.get('/:id', authenticate, schoolController.getSchoolById);
router.post('/', authenticate, authorize('super_admin', 'admin_pusat', 'admin_kabupaten'), schoolController.createSchool);
router.put('/:id', authenticate, authorize('super_admin', 'admin_pusat', 'admin_kabupaten'), schoolController.updateSchool);
router.delete('/:id', authenticate, authorize('super_admin', 'admin_pusat'), schoolController.deleteSchool);
router.get('/:id/statistics', authenticate, schoolController.getSchoolStatistics);

module.exports = router;
