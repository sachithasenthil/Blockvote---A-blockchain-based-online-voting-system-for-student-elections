const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/vote', auth, votingController.castVote);

// Public routes
router.get('/results', votingController.getResults);
router.get('/blockchain', votingController.getBlockchain);
router.get('/validate', votingController.validateChain);

module.exports = router;