import React from 'react';
import '../assets/BatalkanModal.css'; // gunakan file css modal yang sudah kamu punya

const BatalkanPesananModal = ({ transaksi, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Batalkan Pesanan</h2>
        <p>
          Apakah Anda yakin ingin membatalkan pesanan atas nama{' '}
          <strong>{transaksi.nama_pelanggan}</strong> untuk meja{' '}
          <strong>{transaksi.id_meja}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Tidak
          </button>
          <button className="btn-danger" onClick={() => onConfirm(transaksi.id_transaksi)}>
            Ya, Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatalkanPesananModal;
