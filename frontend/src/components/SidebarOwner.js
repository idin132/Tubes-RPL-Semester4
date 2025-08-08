import React from 'react';
import '../assets/owner.css';

const SidebarOwner = () => (
  <div className="sidebar">
    <div className="sidebar-brand"><i class="fa-solid fa-bars side-icon"></i> DineFlow</div>
    <div className="sidebar-menu">
      <a href="/owner"><i class="fa-solid fa-chart-column side-icon-item"></i> Dashboard</a>
      <a href="/owner/meja"><i class="fa-solid fa-utensils side-icon-item"></i> Manajemen Meja</a>
      <a href="/owner/riwayat-transaksi"><i class="fa-solid fa-clock-rotate-left side-icon-item"></i> Riwayat Transaksi</a>
      <a href="/owner/menu"><i class="fa-solid fa-list-ul side-icon-item"></i> Daftar Menu</a>
      {/* <a href="#">🔔 Notifikasi Pesanan</a> */}
    </div>
  </div>
);

export default SidebarOwner;
