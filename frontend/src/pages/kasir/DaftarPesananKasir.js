// pages/kasir/DaftarPesananKasir.js
import React, { useEffect, useState } from "react";
import SidebarKasir from "../../components/SidebarKasir";
import Topbar from "../../components/Topbar";
import "../../assets/kasir.css";
import { useNavigate } from "react-router-dom";
import { getTransaksiBelumBayar } from "../../services/api";
import DetailPesananModal from "../../components/DetailPesananModal";
import EditPesananModal from "../../components/EditPesananModal";
import BatalkanPesananModal from "../../components/BatalkanPesananModal";
import { batalkanTransaksi } from "../../services/api";
import { updateDetailTransaksi } from "../../services/api"; // pastikan ada


const DaftarPesananKasir = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [showBatalkanModal, setShowBatalkanModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransaksiBelumBayar();
      setTransaksi(data);
    } catch (err) {
      console.error("Gagal mengambil transaksi:", err);
    }
  };

  const handlePembayaran = (id) => {
    navigate(`/kasir/pembayaran/${id}`);
  };

  const handleEdit = (trx) => {
    setSelectedTransaksi(trx);
    setShowEditModal(true);
  };

  const handleDetail = (id) => {
    const trx = transaksi.find((t) => t.id_transaksi === id);
    setSelectedTransaksi(trx);
  };

  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        <h1>Daftar Pesanan</h1>
        <div className="grid-pesanan">
          {transaksi.map((trx) => (
            <div key={trx.id_transaksi} className="kartu-pesanan">
              <div className="header-kartu">
                <strong>{trx.id_meja || "XX"}</strong>
                <span>
                  {new Date(trx.tanggal_transaksi).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {/* Dropdown langsung tampil */}
                <div className="dropdown-menu show">
                  <button onClick={() => handleEdit(trx)}>Edit Pesanan</button>
                  <button
                    onClick={() => {
                      setSelectedTransaksi(trx);
                      setShowBatalkanModal(true);
                    }}
                  >
                    Batalkan
                  </button>
                </div>
              </div>

              <div className="body-kartu">
                <p>
                  <strong>{trx.nama_pelanggan}</strong>
                </p>
                <p className="status-belum">Belum Dibayar</p>
                <ul>
                  {trx.detail_transaksis.slice(0, 5).map((item, i) => (
                    <li key={i}>
                      {item.menu?.nama_menu} x {item.jumlah}
                    </li>
                  ))}
                  {trx.detail_transaksis.length > 5 && (
                    <li>Dan {trx.detail_transaksis.length - 5} lainnya...</li>
                  )}
                </ul>
              </div>

              <div className="footer-kartu">
                <button onClick={() => handleDetail(trx.id_transaksi)}>
                  Lihat Rincian Pesanan
                </button>
                <button onClick={() => handlePembayaran(trx.id_transaksi)}>
                  Pembayaran
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTransaksi && (
        <DetailPesananModal
          transaksi={selectedTransaksi}
          onClose={() => setSelectedTransaksi(null)}
          onEdit={(trx) => handleEdit(trx)}
          onBatalkan={(id) => console.log("Batalkan transaksi:", id)}
        />
      )}

      {showEditModal && selectedTransaksi && (
        <EditPesananModal
          transaksi={selectedTransaksi}
          onClose={() => setShowEditModal(false)}
          onSave={async (updatedDetail) => {
            try {
              await updateDetailTransaksi(
                selectedTransaksi.id_transaksi,
                updatedDetail
              );
              setShowEditModal(false);
              fetchData(); // refresh daftar
            } catch (err) {
              console.error("Gagal update:", err);
              alert("Gagal menyimpan perubahan");
            }
          }}
        />
      )}

      {showBatalkanModal && selectedTransaksi && (
        <BatalkanPesananModal
          transaksi={selectedTransaksi}
          onCancel={() => setShowBatalkanModal(false)}
          onConfirm={async (id) => {
            await batalkanTransaksi(id);
            setShowBatalkanModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default DaftarPesananKasir;
