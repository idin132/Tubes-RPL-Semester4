import React, { useEffect, useState } from "react";
import { getMejaOwner, updateStatusMeja } from "../../services/api";
import SidebarOwner from "../../components/SidebarOwner";
import Topbar from "../../components/Topbar";
import "../../assets/owner.css";

const OwnerMejaPage = () => {
  const [meja, setMeja] = useState([]);
  const [selected, setSelected] = useState(null); // meja yg diklik

  useEffect(() => {
    fetchMeja();
  }, []);

  const fetchMeja = async () => {
    const data = await getMejaOwner();
    setMeja(data);
  };

  const openDialog = (m) => setSelected(m); // buka pilihan
  const closeDialog = () => setSelected(null); // tutup pilihan
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

//   const changeStatus = async (status) => {
//     if (!selected) return;
//     await updateStatusMeja(selected.id_meja, status);
//     closeDialog();
//     fetchMeja();
//   };

  return (
    <div className="owner-container">
      <SidebarOwner />
      <div className="owner-main">
        <Topbar />
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
        </div>
      </div>
    </div>
  );
};

export default OwnerMejaPage;
