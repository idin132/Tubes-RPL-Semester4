import React from 'react';
import '../assets/kasir.css';

const SidebarKasir = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">🍽 DineFlow</div>
      <div className="sidebar-menu">
        <a href="/kasir">📊 Dashboard</a>
        <a href="#">📋 Daftar Pesanan</a>
        <a href="#">🔁 Riwayat Transaksi</a>
      </div>
    </div>
  );
};

export default SidebarKasir;
