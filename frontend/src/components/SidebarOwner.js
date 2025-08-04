import React from 'react';
import '../assets/owner.css';

const SidebarOwner = () => (
  <div className="sidebar">
    <div className="sidebar-brand">🍽 DineFlow</div>
    <div className="sidebar-menu">
      <a href="/owner">📊 Dashboard</a>
      <a href="/owner/meja">📋 Manajemen Meja</a>
      <a href="/owner/riwayat-transaksi">🔁 Riwayat Transaksi</a>
      <a href="/owner/menu">🍝 Daftar Menu</a>
      {/* <a href="#">🔔 Notifikasi Pesanan</a> */}
    </div>
  </div>
);

export default SidebarOwner;
