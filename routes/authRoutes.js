const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup); // ✅ REQUIRED
router.post('/login', login);   // ✅ REQUIRED

module.exports = router;
