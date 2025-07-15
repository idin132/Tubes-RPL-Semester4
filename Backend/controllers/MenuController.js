const Menu = require('../models/Menu');

// Ambil semua menu
exports.getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah menu
exports.createMenu = async (req, res) => {
  const { nama_menu, harga_menu, kategori, status_menu, deskripsi } = req.body;
  try {
    const menu = await Menu.create({
      nama_menu,
      harga_menu,
      kategori,
      status_menu,
      deskripsi
    });
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update menu
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    await menu.update(req.body);
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hapus menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    await menu.destroy();
    res.status(200).json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
