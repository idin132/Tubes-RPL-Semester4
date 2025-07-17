import React, { useEffect, useState } from "react";
import SidebarKasir from "../../components/SidebarKasir";
import Topbar from "../../components/Topbar";
import DetailPesananModal from "../../components/DetailPesananModal";
import "../../assets/kasir.css";
import { getTransaksiSudahBayar } from "../../services/api";

const RiwayatTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransaksiSudahBayar();
      setTransaksi(data);
    } catch (err) {
      console.error("Gagal mengambil riwayat transaksi:", err);
    }
  };

  const handleDetail = (id) => {
    const trx = transaksi.find((t) => t.id_transaksi === id);
    setSelectedTransaksi(trx);
  };

  const handleEdit = (trx) => {
    setSelectedTransaksi(trx);
    setShowEditModal(true);
  };

  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        <h1>Riwayat Transaksi</h1>
        <div className="grid-pesanan">
          {transaksi.map((trx) => (
            <div key={trx.id_transaksi} className="kartu-pesanan">
              <div className="header-kartu">
                <strong>Meja {trx.id_meja || "XX"}</strong>
                <span>
                  {new Date(trx.tanggal_transaksi).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="body-kartu">
                <p>
                  <strong>{trx.nama_pelanggan}</strong>
                </p>
                <p className="status-sudah">Lunas</p>
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
                <strong>Total: Rp {trx.grand_total.toLocaleString()}</strong>
              </div>
              <div className="footer-kartu">
                <button onClick={() => handleDetail(trx.id_transaksi)}>
                  Lihat Rincian Pesanan
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
    </div>
  );
};

export default RiwayatTransaksi;
