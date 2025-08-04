import React from 'react';
import '../assets/OrderPage.css';

const MenuCard = ({ menu, onAdd }) => {
  const isTersedia = menu.status_menu === 'Tersedia';

  return (
    <div
      className={`menu-card ${!isTersedia ? 'disabled' : ''}`}
      onClick={() => isTersedia && onAdd(menu)} // hanya bisa diklik jika tersedia
    >
      <img src={menu.gambar || '/gambar/makanan.jpeg'} alt={menu.nama_menu} />
      <h4>{menu.nama_menu}</h4>
      <p>{menu.deskripsi}</p>
      <strong>Rp. {menu.harga_menu.toLocaleString()}</strong>

      {!isTersedia && <div className="menu-overlay">Tidak Tersedia</div>}
    </div>
  );
};

export default MenuCard;