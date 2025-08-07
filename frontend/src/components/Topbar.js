import React from "react";
import Swal from "sweetalert2";
import "../assets/topbar.css";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Lanjutkan untuk Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="topbar">
      {/* <div className="topbar-left">
        <span className="brand">🍽 DineFlow</span>
      </div> */}
      <div className="topbar-right">
        <span className="username">{user?.nama || "Guest"}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
