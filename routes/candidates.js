const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', candidateController.getAllCandidates);

// Protected routes (Admin only in production)
router.post('/', auth, candidateController.addCandidate);

module.exports = router;