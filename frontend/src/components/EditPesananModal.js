// components/kasir/EditPesananModal.js
import React, { useState } from "react";
import "../assets/EditModal.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditPesananModal = ({ transaksi, onClose, onSave }) => {
  const navigate = useNavigate();
  const [detailPesanan, setDetailPesanan] = useState(
    transaksi.detail_transaksis
  );

  const handleUbahJumlah = (index, delta) => {
    const newData = [...detailPesanan];
    newData[index].jumlah += delta;
    if (newData[index].jumlah < 1) newData[index].jumlah = 1;
    setDetailPesanan(newData);
  };

  const handleHapusItem = (index) => {
    const newData = detailPesanan.filter((_, i) => i !== index);
    setDetailPesanan(newData);
  };

  const handleKonfirmasi = () => {
    Swal.fire({
      title: "Simpan Perubahan?",
      text: "Perubahan akan disimpan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onSave(detailPesanan);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Pesanan berhasil diperbarui!",
            timer: 2000,
            showConfirmButton: false,
          });
          onClose(); // Tutup modal setelah sukses
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat menyimpan.",
          });
        }
      }
    });
  };

  const handleBatal = () => {
    if (onClose) onClose();
    navigate("/kasir/daftar-pesanan");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box edit-pesanan">
        <div className="modal-header">
          <h3>Nomor Meja - {transaksi.id_meja || "XX"}</h3>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">

            <p>
              <strong>Nama Pelanggan:</strong> {transaksi.nama_pelanggan}
            </p>
            <p>
              <strong>Status: </strong> 
              <span className="badge merah">Belum Dibayar</span>
            </p>
            


          <ul className="list-menu">
            {detailPesanan.map((item, index) => (
              <li key={index} className="item-menu">
                <span>{item.menu?.nama_menu}</span>
                <span className="table-harga">Rp{item.menu?.harga_menu.toLocaleString()}</span>
                <div className="qty-control">
                  <button className="btn-minus" onClick={() => handleUbahJumlah(index, -1)}>-</button>
                  <span>{item.jumlah}</span>
                  <button className="btn-plus" onClick={() => handleUbahJumlah(index, 1)}>+</button>
                </div>
                <button
                  className="hapus"
                  onClick={() => handleHapusItem(index)}
                >
                  🗑 Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <div onClick={handleBatal} className="btn batal">
            Batal
          </div>
          <div onClick={handleKonfirmasi} className="btn simpan">
            Simpan Perubahan
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPesananModal;
