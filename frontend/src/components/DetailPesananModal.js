// src/components/kasir/DetailPesananModal.js
import React from 'react';
import '../assets/kasir.css';

const DetailPesananModal = ({ transaksi, onClose, handleEdit, onEdit, onBatalkan }) => {
  if (!transaksi) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className='cst-font'>Nomor Meja - {transaksi.id_meja}</h2>
        <div className='hr-rinci'></div>
        {/* <p><strong>Tipe Pesanan:</strong> Takeaway</p> */}
        <p><strong>Nama Pelanggan:</strong> {transaksi.nama_pelanggan}</p>
        <p><strong>Status Pesanan:</strong> {transaksi.status_pesanan}</p>
        <ul className="menu-list">
          {transaksi.detail_transaksis.map((item, index) => (
            <li key={index}>
              {item.menu?.nama_menu} × {item.jumlah}
              <span className="harga">Rp{item.sub_total.toLocaleString()}</span>
            </li>
          ))}
        </ul>

<div className='hr-rinci-2'></div>
        <div className="modal-actions">
          <button className="btn-cancel-kasir" onClick={onClose}>Tutup</button>
          {/* <button className="btn-warn" onClick={() => onBatalkan(transaksi.id_transaksi)}>Batalkan</button> */}
        </div>
      </div>
    </div>
  );
};

export default DetailPesananModal;
