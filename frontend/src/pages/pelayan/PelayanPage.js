import React, { useEffect, useState } from "react";
import { getMeja, updateStatusMeja } from "../../services/api";
import SidebarPelayan from "../../components/SidebarPelayan";
import Topbar from "../../components/Topbar";
import Swal from "sweetalert2";
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

  const openDialog = (m) => {
    setSelected(m); // tetap simpan meja terpilih jika dibutuhkan di tempat lain

    Swal.fire({
      title: `Ubah Status Meja ${m.nomor_meja}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Tersedia",
      confirmButtonColor: "#2dcc70",
      denyButtonText: "Terisi",
      cancelButtonText: "Batal",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await changeStatusSwal(m, "tersedia");
      } else if (result.isDenied) {
        await changeStatusSwal(m, "terisi");
      }
    });
  };

  const changeStatusSwal = async (meja, status) => {
    try {
      await updateStatusMeja(meja.id_meja, status);
      await fetchMeja();

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Status meja ${meja.nomor_meja} diubah menjadi "${status}".`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengubah status.",
      });
    }
  };

  return (
    <div className="pelayan-container">
      <SidebarPelayan />
      <div className="pelayan-main">
        <Topbar />
        <div className="dashboard-content-kasir">
          {/* <div className="card-content-kasir"> */}
            <h1>Manajemen Meja</h1>
            <div className="layout-wrapper">
              <div className="layout-content">
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
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* ===== Dialog Pilihan Status ===== */}
      {/* {selected && (
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
      )} */}
    </div>
  );
};

export default PelayanPage;
