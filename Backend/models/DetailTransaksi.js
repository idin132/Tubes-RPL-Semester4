const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const DetailTransaksi = sequelize.define('DetailTransaksi', {
    id_detail_transaksi: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    jumlah: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    sub_total: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'detail_transaksi',
    timestamps: true,
});

module.exports = DetailTransaksi;