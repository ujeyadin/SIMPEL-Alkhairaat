const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, assetController.getAllAssets);
router.get('/:id', authenticate, assetController.getAssetById);
router.post('/', authenticate, authorize('admin_sekolah', 'admin_kecamatan', 'admin_pusat'), assetController.createAsset);
router.put('/:id', authenticate, authorize('admin_sekolah', 'admin_kecamatan'), assetController.updateAsset);
router.delete('/:id', authenticate, authorize('admin_sekolah', 'admin_pusat'), assetController.deleteAsset);
router.get('/report/by-category', authenticate, assetController.getAssetsByCategory);
router.get('/report/by-location', authenticate, assetController.getAssetsByLocation);

module.exports = router;
