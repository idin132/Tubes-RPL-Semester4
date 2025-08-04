import React from 'react';
import '../assets/topbar.css';

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="topbar">
      {/* <div className="topbar-left">
        <span className="brand">🍽 DineFlow</span>
      </div> */}
      <div className="topbar-right">
        <span className="username">{user?.nama || 'Guest'}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
