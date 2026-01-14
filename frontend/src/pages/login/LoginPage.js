import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        form
      );
      const user = res.data.user;

      if (!user || !user.role) {
        setError("Data user tidak valid");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: res.data.message,
      });

      if (user.role === "kasir") {
        navigate("/kasir");
      } else if (user.role === "pelayan") {
        navigate("/pelayan");
      } else if (user.role === "koki") {
        navigate("/koki/menu");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="">
    {/* Navbar di atas */}
      <div className="navbar">
        <h1 className="navbar-title">DineFlow</h1>
      </div>

      <div className="login-wrapper">
        <div className="login-box">
          <h2 className="login-title"><b>SIGN IN</b></h2>
          <div className="hr"></div>
          <form onSubmit={handleLogin} className="form-class">
            <label><b>Username</b></label>
            <input
              placeholder="Masukkan Username Anda"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label><b>Password</b></label>
            <input
              placeholder="Masukkan Password Anda"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <p className="error-msg">{error}</p>}
            <div className="hr"></div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
