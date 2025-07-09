const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
    id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_menu: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    harga_menu: {
        type: DataTypes.DOUBLE(10),
        allowNull: false
    },
    kategori: {
        type: DataTypes.ENUM('makanan', 'minuman'),
        allowNull: false
    },
    status_menu: {
        type: DataTypes.ENUM('tersedia','tidak tersedia'),
        allowNull: false,
        defaultValue: 'tersedia'
    },
    deskripsi: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'menu',
    timestamps: false
});

module.exports = Menu;