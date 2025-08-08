import React from 'react';
import '../assets/OrderPage.css';

const MenuCard = ({ menu, onAdd }) => {
  const isTersedia = menu.status_menu === 'Tersedia';

  return (
    <div
      className={`menu-card-cst ${!isTersedia ? 'disabled' : ''}`}
      onClick={() => isTersedia && onAdd(menu)} // hanya bisa diklik jika tersedia
    >
      <img src={menu.gambar || '/gambar/makanan.jpeg'} alt={menu.nama_menu} />
      <h4 className='title-menu-cst'>{menu.nama_menu}</h4>
      <div className='hr-menu'></div>
      <p className='deskripsi-menu'>{menu.deskripsi}</p>
      <div className='harga-menu'>Rp{menu.harga_menu.toLocaleString()}</div>

      {!isTersedia && <div className="menu-overlay">Tidak Tersedia</div>}
    </div>
  );
};

export default MenuCard;