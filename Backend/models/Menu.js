const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Menu = db.define('menu', {
  id_menu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_menu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga_menu: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_menu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'menu',
  timestamps: false
});

module.exports = Menu;
