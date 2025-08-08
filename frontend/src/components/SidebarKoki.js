import React from 'react';
import '../assets/koki.css';

const SidebarPelayan = () => (
  <div className="sidebar">
    <div className="sidebar-brand"><i class="fa-solid fa-bars side-icon"></i> DineFlow</div>
    <div className="sidebar-menu">
      <a href="/koki/menu"><i class="fa-solid fa-list-ul side-icon-item"></i> Daftar Menu</a>
      <a href="/koki/pesanan"><i class="fa-solid fa-clipboard-list side-icon-item"></i> Daftar Pesanan</a>
    </div>
  </div>
);

export default SidebarPelayan;
