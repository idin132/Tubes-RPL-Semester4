import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SidebarOwner from "../../components/SidebarOwner";
import Topbar from "../../components/Topbar";
import DetailPesananModal from "../../components/DetailPesananModal";
import "../../assets/kasir.css";
import { getTransaksiSudahBayar } from "../../services/api";

const RiwayatTransaksiOwner = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [filterText, setFilterText] = useState("");

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

  const filteredData = transaksi.filter((trx) => {
    const keyword = filterText.toLowerCase();

    return (
      trx.nama_pelanggan?.toLowerCase().includes(keyword) ||
      `meja ${trx.id_meja}`.toLowerCase().includes(keyword) ||
      trx.detail_transaksis?.some((item) =>
        item.menu?.nama_menu.toLowerCase().includes(keyword)
      ) ||
      trx.grand_total.toString().includes(keyword.replace(/\D/g, "")) // cocokkan angka saja
    );
  });

  const handleDetail = (trx) => {
    setSelectedTransaksi(trx);
  };

  const columns = [
    {
      name: "Waktu",
      selector: (row) =>
        new Date(row.tanggal_transaksi).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      sortable: true,
      width: "100px",
    },
    {
      name: "Meja",
      selector: (row) => `Meja ${row.id_meja || "XX"}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Pelanggan",
      selector: (row) => row.nama_pelanggan,
      sortable: true,
    },
    {
      name: "Status",
      cell: () => <span className="status-sudah">Lunas</span>,
      width: "100px",
    },
    {
      name: "Total",
      selector: (row) => `Rp ${row.grand_total.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button className="btn-pembayaran" onClick={() => handleDetail(row)}>
          Detail
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="kasir-container">
      <SidebarOwner />
      <div className="kasir-main">
        <Topbar />
        <div className="dashboard-content">
          <h1>Riwayat Transaksi</h1>
          <input
            type="text"
            placeholder="Cari pesanan..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <DataTable
            columns={columns}
            data={filteredData} // ← gunakan data yang sudah difilter
            pagination
            highlightOnHover
            striped
            responsive
            persistTableHead
            noHeader={false}
          />
        </div>
      </div>
      {selectedTransaksi && (
        <DetailPesananModal
          transaksi={selectedTransaksi}
          onClose={() => setSelectedTransaksi(null)}
          onEdit={() => {}}
          onBatalkan={() => {}}
        />
      )}
    </div>
  );
};

export default RiwayatTransaksiOwner;
