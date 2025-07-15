const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Meja = db.define('meja', {
  id_meja: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomor_meja: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_meja: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'meja',
  timestamps: false
});

module.exports = Meja;
