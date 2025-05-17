const express = require('express');
const router = express.Router();
const upload = require('../middlewares/csvValidator');
const { uploadCSV } = require('../controllers/csvController');
const verifyToken = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/upload', authMiddleware,verifyToken, upload.single('file'), uploadCSV);

module.exports = router;
