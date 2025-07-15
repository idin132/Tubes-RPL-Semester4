import React, { useEffect, useState } from 'react';
import { getMenus, createMenu, deleteMenu } from '../../services/api';
import '../css/MenuPage.css'; // tambahkan file CSS

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    nama_menu: '',
    harga_menu: '',
    kategori: '',
    status_menu: '',
    deskripsi: '',
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const data = await getMenus();
    setMenus(data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createMenu(form);
    setForm({ nama_menu: '', harga_menu: '', kategori: '', status_menu: '', deskripsi: '' });
    fetchMenus();
  };

  const handleDelete = async id => {
    await deleteMenu(id);
    fetchMenus();
  };

  return (
    <div className="menu-container">
      <h2>📋 Daftar Menu</h2>

      <form className="menu-form" onSubmit={handleSubmit}>
        <input name="nama_menu" placeholder="Nama Menu" value={form.nama_menu} onChange={handleChange} required />
        <input name="harga_menu" placeholder="Harga" value={form.harga_menu} onChange={handleChange} required />
        <input name="kategori" placeholder="Kategori" value={form.kategori} onChange={handleChange} required />
        <input name="status_menu" placeholder="Status (tersedia/habis)" value={form.status_menu} onChange={handleChange} required />
        <textarea name="deskripsi" placeholder="Deskripsi" value={form.deskripsi} onChange={handleChange}></textarea>
        <button type="submit">➕ Tambah Menu</button>
      </form>

      <div className="menu-list">
        {menus.map(menu => (
          <div className="menu-card" key={menu.id_menu}>
            <div className="menu-info">
              <h3>{menu.nama_menu}</h3>
              <p><strong>Harga:</strong> Rp {menu.harga_menu}</p>
              <p><strong>Kategori:</strong> {menu.kategori}</p>
              <p><strong>Status:</strong> {menu.status_menu}</p>
              <p>{menu.deskripsi}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(menu.id_menu)}>🗑 Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
