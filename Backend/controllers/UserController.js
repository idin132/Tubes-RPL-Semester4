const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    res.json({ message: 'Login berhasil', user: { id_user: user.id_user, nama: user.nama, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
