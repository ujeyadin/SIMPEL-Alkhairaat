const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitor.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, visitorController.getAllVisitors);
router.get('/:id', authenticate, visitorController.getVisitorById);
router.post('/', authenticate, visitorController.createVisitor);
router.put('/:id', authenticate, visitorController.updateVisitor);
router.delete('/:id', authenticate, authorize('admin_sekolah', 'admin_pusat'), visitorController.deleteVisitor);
router.patch('/:id/checkout', authenticate, visitorController.checkoutVisitor);
router.get('/report/by-category', authenticate, visitorController.getVisitorsByCategory);

module.exports = router;
