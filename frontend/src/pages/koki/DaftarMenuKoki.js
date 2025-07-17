import React, { useEffect, useState } from "react";
import SidebarKoki from "../../components/SidebarKoki";
import "../../assets/koki.css";
import { getMenus, updateStatusMenu } from "../../services/api";

const DaftarMenuKoki = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const data = await getMenus();
    setMenus(data);
  };

  const handleStatusChange = async (id_menu, status) => {
    const newStatus = status === "Tersedia" ? "Tidak Tersedia" : "Tersedia";
    await updateStatusMenu(id_menu, newStatus);
    fetchMenus();
  };

  return (
    <div className="koki-container">
      <SidebarKoki />
      <div className="koki-main">
        <h1>Daftar Menu</h1>
        <div className="menu-grid">
          {menus.map((menu) => (
            <div key={menu.id_menu} className="menu-card">
              <img
                src={menu.gambar || "https://via.placeholder.com/150"}
                alt={menu.nama_menu}
              />
              <h4>{menu.nama_menu}</h4>
              <select
                value={menu.status_menu}
                onChange={() =>
                  handleStatusChange(menu.id_menu, menu.status_menu)
                }
              >
                <option value="Tersedia">✔ Tersedia</option>
                <option value="Tidak Tersedia">✖ Tidak Tersedia</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaftarMenuKoki;
