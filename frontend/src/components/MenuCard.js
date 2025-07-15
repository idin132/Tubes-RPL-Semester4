import React from 'react';
import '../assets/OrderPage.css';

const MenuCard = ({ menu, onAdd }) => {
  return (
    <div className="menu-card" onClick={() => onAdd(menu)}>
      <img src={menu.gambar || '/gambar/makanan.jpeg'} alt={menu.nama_menu} />
      <h4>{menu.nama_menu}</h4>
      <p>{menu.deskripsi}</p>
      <strong>Rp. {menu.harga_menu.toLocaleString()}</strong>
    </div>
  );
};

export default MenuCard;
