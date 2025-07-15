const Meja = require('../models/Meja');

exports.getAllMeja = async (req, res) => {
  const data = await Meja.findAll();
  res.json(data);
};

exports.updateStatusMeja = async (req, res) => {
  const { id } = req.params;
  const { status_meja } = req.body;

  const meja = await Meja.findByPk(id);
  if (!meja) return res.status(404).json({ message: 'Meja tidak ditemukan' });

  meja.status_meja = status_meja;
  await meja.save();
  res.json(meja);
};
exports.createMeja = async (req, res) => {
  const { nomor_meja, status_meja } = req.body;

  const newMeja = await Meja.create({ nomor_meja, status_meja });
  res.status(201).json(newMeja);
};
exports.deleteMeja = async (req, res) => {
  const { id } = req.params;

  const meja = await Meja.findByPk(id);
  if (!meja) return res.status(404).json({ message: 'Meja tidak ditemukan' });

  await meja.destroy();
  res.json({ message: 'Meja berhasil dihapus' });
}