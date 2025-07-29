import React from 'react';
import '../assets/pelayan.css';

const SidebarPelayan = () => (
  <div className="sidebar">
    <div className="sidebar-brand">🍽 DineFlow</div>
    <div className="sidebar-menu">
      <a href="/pelayan">📊 Manajemen Meja</a>
      <a href="/pelayan/pesanan">🔔 Daftar Pesanan</a>
    </div>
  </div>
);

export default SidebarPelayan;
