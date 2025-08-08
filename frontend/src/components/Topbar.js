import React from "react";
import Swal from "sweetalert2";
import "../assets/topbar.css";
import NavDropdown from 'react-bootstrap/NavDropdown';

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
      <div className="topbar-right">

        <NavDropdown
        className="username"
          title={
            <span className="username">
              <i className="fa-solid fa-user"></i> {user?.nama || "Guest"}
            </span>
          }
          align="end"
        >

          <NavDropdown.Item onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </NavDropdown.Item>
        </NavDropdown>
        {/* <button className="logout-btn" onClick={handleLogout}>
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button> */}
      </div>
    </div>
  );
};

export default Topbar;
