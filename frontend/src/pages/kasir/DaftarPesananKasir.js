// pages/kasir/DaftarPesananKasir.js
import React, { useEffect, useState } from "react";
import SidebarKasir from "../../components/SidebarKasir";
import Topbar from "../../components/Topbar";
import {
  getTransaksiById,
  updatePembayaranTransaksi,
} from "../../services/api";
import "../../assets/kasir.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getTransaksiBelumBayar } from "../../services/api";
import DetailPesananModal from "../../components/DetailPesananModal";
import EditPesananModal from "../../components/EditPesananModal";
// import BatalkanPesananModal from "../../components/BatalkanPesananModal";
import { batalkanTransaksi } from "../../services/api";
import { updateDetailTransaksi } from "../../services/api"; // pastikan ada
import Dropdown from 'react-bootstrap/Dropdown';
import { forwardRef } from "react";

const DaftarPesananKasir = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
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

  const handleEdit = (trx) => {
    setSelectedTransaksi(trx);
    setShowEditModal(true);
  };

  const handleDetail = (id) => {
    const trx = transaksi.find((t) => t.id_transaksi === id);
    setSelectedTransaksi(trx);
    setShowDetailModal(true);
  };

  const handleBatalkan = (id) => {
    Swal.fire({
      title: "Batalkan Pesanan?",
      text: "Pesanan akan dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, batalkan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await batalkanTransaksi(id);
          await fetchData();
          Swal.fire({
            icon: "success",
            title: "Dibatalkan",
            text: "Pesanan berhasil dibatalkan.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal membatalkan pesanan.",
          });
        }
      }
    });
  };

  const handlePembayaran = async (id_transaksi) => {
    try {
      const trx = await getTransaksiById(id_transaksi);

      const { value: formValues } = await Swal.fire({
        title: "Pembayaran",
        html: `
        <div style="text-align: left;">
          <p><strong>Nomor Meja:</strong> ${trx.id_meja || "-"}</p>
          <p><strong>Nama:</strong> ${trx.nama_pelanggan || "-"}</p>
          <p><strong>Total:</strong> Rp. ${
            trx.grand_total?.toLocaleString() || "0"
          }</p>

          <label for="metode">Metode Pembayaran:</label>
          <select id="metode" class="swal2-input" style="width: 100%;">
            <option value="cash">Cash</option>
            <option value="qris">QRIS</option>
            <option value="debit">Debit</option>
          </select>

          <label for="uangBayar">Uang Bayar:</label>
          <input id="uangBayar" type="number" class="swal2-input" placeholder="Masukkan jumlah uang" style="width: 55%;" />
        </div>
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Simpan & Cetak Struk",
        cancelButtonText: "Batal",
        preConfirm: () => {
          const metode = document.getElementById("metode").value;
          const uangBayar = document.getElementById("uangBayar").value;

          if (!uangBayar || isNaN(parseInt(uangBayar))) {
            Swal.showValidationMessage("Masukkan jumlah uang yang valid.");
            return false;
          }

          return {
            metode,
            uangBayar: parseInt(uangBayar),
          };
        },
      });

      if (formValues) {
        await updatePembayaranTransaksi(id_transaksi, {
          metode_bayar: formValues.metode,
          uang_bayar: formValues.uangBayar,
          status_pembayaran: "sudah bayar",
          status_pesanan: "selesai",
        });

        Swal.fire({
          icon: "success",
          title: "Pembayaran Berhasil",
          text: "Pesanan telah dibayar.",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate(`/kasir/struk/${id_transaksi}`);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan pembayaran.",
      });
    }
  };

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        cursor: "pointer",
        fontSize: "18px",
        color: "#333",
        userSelect: "none",
        padding: "10px", // 🔹 tambahkan padding
        display: "inline-flex", // 🔹 biar padding terasa
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px", // opsional biar rapi
      }}
    >
      <i className="fa-solid fa-ellipsis-vertical"></i>
    </span>
  ));

  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        <Topbar />
        <div className="dashboard-content-kasir">

          <div className="card-content-kasir">
            <h1>Daftar Pesanan</h1>
            <div className="hr-judul"></div>

            <div className="grid-pesanan">
              {transaksi.map((trx) => (
                <div key={trx.id_transaksi} className="kartu-pesanan">
                  <div className="header-kartu-kasir">
                    <strong>Meja No. {trx.id_meja || "XX"}</strong>

                      {/* Dropdown Bootstrap */}
                      <Dropdown align="end">
                        <Dropdown.Toggle as={CustomToggle} />

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(trx)}>
                            Edit Pesanan
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleBatalkan(trx.id_transaksi)}>
                            Batalkan
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                  </div>

                  <div className="body-kartu">
                    <span className="jam-order">
                        {new Date(trx.tanggal_transaksi).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </span>

                    <div className="nama-status">
                    <p>
                      <strong>{trx.nama_pelanggan}</strong>
                    </p>

                    <p className="status-belum">Belum Dibayar</p>
                    </div>

                    <div className="hr-pesanan-atas"></div>

                    <ul className="list-pesanan-ksr">
                      {trx.detail_transaksis.slice(0, 5).map((item, i) => (
                        <li key={i}>
                          {item.menu?.nama_menu} x {item.jumlah}
                        </li>
                      ))}
                      {trx.detail_transaksis.length > 5 && (
                        <li>Dan {trx.detail_transaksis.length - 5} lainnya...</li>
                      )}
                    </ul>

                    <div className="hr-pesanan-bawah"></div>

                  </div>

                  <div className="footer-kartu">
                    <button className="rincian-btn" onClick={() => handleDetail(trx.id_transaksi)}>
                      Lihat Rincian
                    </button>
                    <button className="pembayaran-btn" onClick={() => handlePembayaran(trx.id_transaksi)}>
                      Pembayaran
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>



        </div>
      </div>

      {showDetailModal && selectedTransaksi && (
        <DetailPesananModal
          transaksi={selectedTransaksi}
          onClose={() => {
            setSelectedTransaksi(null);
            setShowDetailModal(false);
          }}
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
    </div>
  );
};

export default DaftarPesananKasir;
