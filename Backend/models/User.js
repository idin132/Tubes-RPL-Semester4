const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
