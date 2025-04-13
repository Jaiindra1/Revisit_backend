const express = require('express');
const router = express.Router();
const { getCategories, addCategory, updateCategory } = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getCategories);
router.post('/', protect, addCategory);
router.put('/:id', protect, updateCategory);

module.exports = router;
