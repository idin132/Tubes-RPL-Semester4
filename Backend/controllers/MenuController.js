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

// PUT /api/menu/:id - Ubah status_menu
exports.updateStatusMenu = async (req, res) => {
  const { id } = req.params;
  const { status_menu } = req.body;

  if (!status_menu) {
    return res.status(400).json({ message: 'Status menu harus diisi.' });
  }

  try {
    const [updated] = await Menu.update(
      { status_menu },
      { where: { id_menu: id } }
    );

    if (updated) {
      res.status(200).json({ message: 'Status menu berhasil diperbarui.' });
    } else {
      res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah status menu', error });
  }
};