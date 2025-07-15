const express = require('express');
const router = express.Router();
const TransaksiController = require('../controllers/TransaksiController');

router.post('/', TransaksiController.createTransaksi);

module.exports = router;
