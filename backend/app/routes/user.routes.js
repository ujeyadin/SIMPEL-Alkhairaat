const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, authorize('super_admin', 'admin_pusat', 'admin_kabupaten'), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/', authenticate, authorize('super_admin', 'admin_pusat'), userController.createUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, authorize('super_admin', 'admin_pusat'), userController.deleteUser);
router.patch('/:id/status', authenticate, authorize('super_admin', 'admin_pusat'), userController.changeUserStatus);

module.exports = router;
