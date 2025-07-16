import React, { useEffect, useState } from "react";
import { getMeja, updateStatusMeja } from "../../services/api";
import SidebarPelayan from "../../components/SidebarPelayan";
import "../../assets/pelayan.css";

const PelayanPage = () => {
  const [meja, setMeja] = useState([]);
  const [selected, setSelected] = useState(null); // meja yg diklik

  useEffect(() => {
    fetchMeja();
  }, []);

  const fetchMeja = async () => {
    const data = await getMeja();
    setMeja(data);
  };

  const openDialog = (m) => setSelected(m); // buka pilihan
  const closeDialog = () => setSelected(null); // tutup pilihan

  const changeStatus = async (status) => {
    if (!selected) return;
    await updateStatusMeja(selected.id_meja, status);
    closeDialog();
    fetchMeja();
  };

  return (
    <div className="pelayan-container">
      <SidebarPelayan />
      <div className="pelayan-main">
        <div className="topbar">
          <div className="topbar-right">Dwi Putra Juniargi ⌄</div>
        </div>

        <div className="dashboard-content">
          <h1>Manajemen Meja</h1>
          <div className="layout-wrapper">
            <div className="layout">
              {meja.map((m) => (
                <div
                  key={m.id_meja}
                  className={`meja ${
                    m.status_meja === "tersedia" ? "tersedia" : "terisi"
                  }`}
                  onClick={() => openDialog(m)}
                >
                  {m.nomor_meja}
                </div>
              ))}
            </div>
          </div>
          {/* 
          <div className="label-kasir">Kasir</div>
          <div className="label-pintu">Pintu</div> */}
        </div>
      </div>

      {/* ===== Dialog Pilihan Status ===== */}
      {selected && (
        <div className="overlay" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Ubah Status Meja {selected.nomor_meja}</h3>
            <button
              className="btn tersedia"
              onClick={() => changeStatus("tersedia")}
            >
              Tersedia
            </button>
            <button
              className="btn terisi"
              onClick={() => changeStatus("terisi")}
            >
              Terisi
            </button>
            <button className="btn cancel" onClick={closeDialog}>
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PelayanPage;
