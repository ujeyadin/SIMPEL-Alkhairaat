const express = require('express');
const router = express.Router();
const letterController = require('../controllers/letter.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', authenticate, letterController.getAllLetters);
router.get('/:id', authenticate, letterController.getLetterById);
router.post('/', authenticate, letterController.createLetter);
router.put('/:id', authenticate, letterController.updateLetter);
router.delete('/:id', authenticate, authorize('admin_sekolah', 'admin_pusat'), letterController.deleteLetter);
router.patch('/:id/status', authenticate, letterController.updateLetterStatus);
router.get('/report/incoming', authenticate, letterController.getIncomingLetters);
router.get('/report/outgoing', authenticate, letterController.getOutgoingLetters);

module.exports = router;
