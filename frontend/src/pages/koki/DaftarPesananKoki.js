import React, { useEffect, useState } from "react";
import SidebarKoki from "../../components/SidebarKoki";
import "../../assets/koki.css";
import { getTransaksiPending,  updateStatusPesanan } from "../../services/api";


const DaftarPesananKoki = () => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransaksiPending(); // gunakan yang fetch status_pesanan === 'pending'
      setTransaksi(data);
    } catch (err) {
      console.error("Gagal ambil data transaksi:", err);
    }
  };

  const handleSelesai = async (id) => {
    try {
      await updateStatusPesanan(id);
      alert("Pesanan telah ditandai selesai dimasak");
      fetchData(); // update daftar
    } catch (err) {
      alert("Gagal memperbarui status pesanan");
    }
  };

  return (
    <div className="koki-container">
      <SidebarKoki />
      <div className="koki-main">
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
              </div>
              <div className="body-kartu">
                <p>
                  <strong>{trx.nama_pelanggan}</strong>
                </p>
                <hr />
                <ul>
                  {trx.detail_transaksis.map((item, i) => (
                    <li key={i}>
                      {item.menu?.nama_menu} x {item.jumlah}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-kartu">
                <button
                  className="btn-selesai"
                  onClick={() => handleSelesai(trx.id_transaksi)}
                >
                  ✓ Selesai Dimasak
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaftarPesananKoki;
