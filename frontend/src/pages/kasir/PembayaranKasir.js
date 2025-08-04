import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTransaksiById,
  updatePembayaranTransaksi,
} from "../../services/api";
import SidebarKasir from "../../components/SidebarKasir";
// import Topbar from "../../components/TopBar";
import "../../assets/kasir.css";

const PembayaranKasir = ({onClose}) => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [metode, setMetode] = useState("cash");
  const [uangBayar, setUangBayar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransaksiById(id);
      setTransaksi(data);
      setMetode(data.metode_bayar || "cash");
      setUangBayar(data.uang_bayar || "");
    } catch (err) {
      console.error("Gagal mengambil data transaksi:", err);
    }
  };

  const handleBatal = () => {
    if (onClose) onClose();
    navigate("/kasir/daftar-pesanan");
  };

  <button onClick={handleBatal} className="btn batal">
    Kembali
  </button>;

  const handleSimpan = async () => {
    const parsedBayar = parseInt(uangBayar);
    if (isNaN(parsedBayar)) return alert("Masukkan jumlah uang valid.");

    try {
      await updatePembayaranTransaksi(id, {
        metode_bayar: metode,
        uang_bayar: parsedBayar,
        status_pembayaran: "sudah bayar",
        status_pesanan: "selesai",
      });
      alert("Pembayaran berhasil disimpan.");
      navigate(`/kasir/struk/${id}`); // ⬅️ arahkan ke halaman cetak struk
    } catch (err) {
      alert("Gagal menyimpan pembayaran");
    }
  };

  if (!transaksi) return <div>Loading...</div>;

  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        {/* <Topbar /> */}
        <h1>Pembayaran</h1>
        <div className="box-pembayaran">
          <p>
            <strong>Nomor Meja:</strong> {transaksi.id_meja}
          </p>
          <p>
            <strong>Nama:</strong> {transaksi.nama_pelanggan}
          </p>
          <p>
            <strong>Total Tagihan:</strong> Rp.{" "}
            {transaksi.grand_total?.toLocaleString()}
          </p>

          <div className="form-group">
            <label>Metode Pembayaran:</label>
            <select value={metode} onChange={(e) => setMetode(e.target.value)}>
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <div className="form-group">
            <label>Uang Bayar:</label>
            <input
              type="number"
              value={uangBayar}
              onChange={(e) => setUangBayar(e.target.value)}
              placeholder="Masukkan jumlah uang"
            />
          </div>

          <button className="btn-pembayaran" onClick={handleSimpan}>
            Simpan dan Cetak Struk
          </button>
          <button onClick={handleBatal} className="btn batal">
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default PembayaranKasir;
