const express = require('express');
const router = express.Router();
const TransaksiController = require('../controllers/TransaksiController');

router.post('/', TransaksiController.createTransaksi);
router.get('/belum-bayar', TransaksiController.getTransaksiBelumBayar);
router.put('/:id/batalkan', TransaksiController.batalkanTransaksi);
router.get('/:id', TransaksiController.getById);
router.put('/:id', TransaksiController.updateTransaksi);



module.exports = router;
