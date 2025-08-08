import React from 'react';
import '../assets/kasir.css';

const SidebarKasir = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand"><i class="fa-solid fa-bars side-icon"></i> DineFlow</div>
      <div className="sidebar-menu">
        <a href="/kasir"><i class="fa-solid fa-chart-column side-icon-item"></i> Dashboard</a>
        <a href="/kasir/daftar-pesanan"><i class="fa-solid fa-clipboard-list side-icon-item"></i> Daftar Pesanan</a>
        <a href="/kasir/riwayat-transaksi"><i class="fa-solid fa-clock-rotate-left side-icon-item"></i> Riwayat Transaksi</a>
      </div>
    </div>
  );
};

export default SidebarKasir;
