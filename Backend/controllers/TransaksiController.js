const Transaksi = require('../models/Transaksi');
const DetailTransaksi = require('../models/DetailTransaksi');
const Meja = require('../models/Meja');
const Menu = require('../models/Menu');


exports.createTransaksi = async (req, res) => {
  const {
    id_meja,
    nama_pelanggan,
    metode_bayar,
    uang_bayar,
    status_pesanan,
    status_pembayaran,
    catatan,
    cart,
    service_fee = 1000
  } = req.body;

  try {
    const grand_total = cart.reduce((sum, item) => sum + (item.harga_menu * item.jumlah), 0) + service_fee;

    const transaksi = await Transaksi.create({
      id_meja,
      nama_pelanggan,
      metode_bayar,
      uang_bayar,
      grand_total,
      status_pesanan,
      status_pembayaran,
      catatan,
      tanggal_transaksi: new Date()
    });

    for (const item of cart) {
      await DetailTransaksi.create({
        id_transaksi: transaksi.id_transaksi,
        id_menu: item.id_menu,
        jumlah: item.jumlah,
        sub_total: item.harga_menu * item.jumlah
      });
    }

    res.status(201).json({ message: 'Transaksi berhasil dibuat', transaksi_id: transaksi.id_transaksi });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat transaksi', error: err.message });
  }
};
