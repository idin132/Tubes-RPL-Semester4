const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Menu = require('./Menu');

const DetailTransaksi = db.define('detail_transaksi', {
  id_detail_transaksi: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_transaksi: DataTypes.INTEGER,
  id_menu: DataTypes.INTEGER,
  jumlah: DataTypes.INTEGER,
  sub_total: DataTypes.INTEGER
}, {
  tableName: 'detail_transaksi',
  timestamps: false
});

DetailTransaksi.belongsTo(Menu, { foreignKey: 'id_menu' });

module.exports = DetailTransaksi;
