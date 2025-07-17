import React from 'react';
import '../assets/koki.css';

const SidebarPelayan = () => (
  <div className="sidebar">
    <div className="sidebar-brand">🍽 DineFlow</div>
    <div className="sidebar-menu">
      <a href="/koki/menu">📊 Daftar Menu</a>
      <a href="/koki/pesanan">🔔 Daftar Pesanan Masuk</a>
    </div>
  </div>
);

export default SidebarPelayan;
