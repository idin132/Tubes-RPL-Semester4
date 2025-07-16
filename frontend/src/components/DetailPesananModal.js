// src/components/kasir/DetailPesananModal.js
import React from 'react';
import '../assets/kasir.css';

const DetailPesananModal = ({ transaksi, onClose, handleEdit, onEdit, onBatalkan }) => {
  if (!transaksi) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Nomor Meja - {transaksi.id_meja}</h2>
        {/* <p><strong>Tipe Pesanan:</strong> Takeaway</p> */}
        <p><strong>Nama Pelanggan:</strong> {transaksi.nama_pelanggan}</p>
        <p className="status-belum">Belum Dibayar</p>

        <ul className="menu-list">
          {transaksi.detail_transaksis.map((item, index) => (
            <li key={index}>
              {item.menu?.nama_menu} × {item.jumlah}
              <span className="harga">Rp{item.sub_total.toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Tutup</button>
          {/* <button className="btn-warn" onClick={() => onBatalkan(transaksi.id_transaksi)}>Batalkan</button> */}
        </div>
      </div>
    </div>
  );
};

export default DetailPesananModal;
