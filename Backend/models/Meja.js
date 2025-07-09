const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Meja = sequelize.define('Meja', {
    id_meja: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nomor_meja: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    status_meja: {
        type: DataTypes.ENUM('tersedia', 'tidak tersedia'),
        allowNull: false,
        defaultValue: 'tersedia'
    }
}, {
    tableName: 'meja',
    timestamps: false
});

module.exports = Meja;