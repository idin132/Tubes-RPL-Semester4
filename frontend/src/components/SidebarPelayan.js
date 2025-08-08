import React from 'react';
import '../assets/pelayan.css';

const SidebarPelayan = () => (
  <div className="sidebar">
    <div className="sidebar-brand"><i class="fa-solid fa-bars side-icon"></i> DineFlow</div>
    <div className="sidebar-menu">
      <a href="/pelayan"><i class="fa-solid fa-utensils side-icon-item"></i> Manajemen Meja</a>
      <a href="/pelayan/pesanan"><i class="fa-solid fa-clipboard-list side-icon-item"></i> Daftar Pesanan</a>
    </div>
  </div>
);

export default SidebarPelayan;
