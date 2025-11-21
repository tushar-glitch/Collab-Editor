const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

// Protect AI routes
router.use(auth);

router.post('/grammar-check', aiController.grammarCheck);
router.post('/summarize', aiController.summarize);
router.post('/complete', aiController.complete);

module.exports = router;
