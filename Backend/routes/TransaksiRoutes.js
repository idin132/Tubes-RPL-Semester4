const express = require('express');
const router = express.Router();
const TransaksiController = require('../controllers/TransaksiController');

router.get('/pending', TransaksiController.getTransaksiPending);
router.post('/', TransaksiController.createTransaksi);
router.get('/belum-bayar', TransaksiController.getTransaksiBelumBayar);
router.get("/sudah-bayar", TransaksiController.getTransaksiSudahBayar);
router.get('/statistik', TransaksiController.getStatistikKasir);
router.put('/:id/batalkan', TransaksiController.batalkanTransaksi);
router.get('/:id', TransaksiController.getById);
router.put('/:id', TransaksiController.updateTransaksi);
router.put('/:id_transaksi/detail', TransaksiController.updateDetailTransaksi);
router.patch('/:id/selesai', TransaksiController.updateStatusPesanan);



module.exports = router;
