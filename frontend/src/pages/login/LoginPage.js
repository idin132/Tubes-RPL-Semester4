import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css'; // tambahkan file CSS

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', form);
      alert(res.data.message);
      // Simpan user login di localStorage dan redirect jika perlu
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">SIGN IN</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
