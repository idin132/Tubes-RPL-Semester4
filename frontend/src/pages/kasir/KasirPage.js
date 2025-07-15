import React from 'react';
import SidebarKasir from '../../components/SidebarKasir';
import Topbar from '../../components/Topbar';
import '../../assets/kasir.css';

const KasirPage = () => {
  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        <Topbar />
        <div className="dashboard-content">
          <h1>Dashboard</h1>

          <div className="stats">
            <div className="stat-box green">
              <h4>Pendapatan Hari Ini</h4>
              <p>Rp 95.000</p>
            </div>
            <div className="stat-box yellow">
              <h4>Pesanan Hari Ini</h4>
              <p>18</p>
            </div>
            <div className="stat-box outline">
              <h4>Total Pesanan</h4>
              <p>80</p>
            </div>
          </div>

          <div className="chart-section">
            <h2>Pendapatan Selama 30 Hari Kebelang</h2>
            <div className="chart-placeholder">
              <p>[Grafik Dummy Placeholder]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KasirPage;
