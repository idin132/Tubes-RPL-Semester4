const { DataTypes } = require('sequelize');
const db = require('../config/database');
const DetailTransaksi = require('./DetailTransaksi');

const Transaksi = db.define('transaksi', {
  id_transaksi: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_meja: DataTypes.INTEGER,
  nama_pelanggan: DataTypes.STRING,
  tanggal_transaksi: DataTypes.DATE,
  metode_bayar: DataTypes.STRING,
  uang_bayar: DataTypes.INTEGER,
  grand_total: DataTypes.INTEGER,
  status_pesanan: DataTypes.STRING,
  status_pembayaran: DataTypes.STRING,
  catatan: DataTypes.STRING
}, {
  tableName: 'transaksi',
  timestamps: false
});

Transaksi.hasMany(DetailTransaksi, { foreignKey: 'id_transaksi' });

module.exports = Transaksi;
