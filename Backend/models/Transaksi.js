const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_pelanggan: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tanggal_transaksi: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    metode_bayar: {
        type: DataTypes.ENUM('tunai', 'transfer'),
        allowNull: false
    },
    uang_bayar: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    grand_total: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    status_pesanan: {
        type: DataTypes.ENUM('belum dibayar', 'sudah dibayar'),
        allowNull: false
    },
    status_pembayaran: {
        type: DataTypes.ENUM('belum lunas', 'lunas'),
        allowNull: false
    }
}, {
    tableName: 'transaksi',
    timestamps: true
});

module.exports = Transaksi;