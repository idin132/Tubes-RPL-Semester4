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

exports.getTransaksiBelumBayar = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({
      where: { status_pembayaran: 'belum bayar' }, // tambahkan jika perlu
      include: [
        { model: DetailTransaksi, include: [Menu] }
      ],
      order: [['tanggal_transaksi', 'DESC']] // ✅ pakai kolom yang memang ada
    });
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data transaksi', error: error.message });
  }
};

exports.batalkanTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaksi.update(
      { status_pesanan: 'dibatalkan', status_pembayaran: 'dibatalkan' },
      { where: { id_transaksi: id } }
    );
    res.json({ message: 'Transaksi dibatalkan' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membatalkan transaksi', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const trx = await Transaksi.findByPk(req.params.id, {
      include: [{ model: DetailTransaksi, include: 'menu' }]
    });
    if (!trx) return res.status(404).json({ message: 'Tidak ditemukan' });
    res.json(trx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaksi = async (req, res) => {
  try {
    const trx = await Transaksi.findByPk(req.params.id);
    if (!trx) return res.status(404).json({ message: 'Tidak ditemukan' });
    await trx.update(req.body);
    res.json({ message: 'Transaksi diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

