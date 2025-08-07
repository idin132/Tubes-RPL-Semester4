import React from 'react';
import SidebarOwner from '../../components/SidebarOwner';
import '../../assets/owner.css';
import { useEffect, useState } from 'react';
import Topbar from "../../components/Topbar";
// import Topbar from '../../components/Topbar';
import { getStatistikOwner } from '../../services/api';

const OwnerPage = () => {
  const [statistik, setStatistik] = useState({
    pendapatanHariIni: 0,
    jumlahPesananHariIni: 0,
    totalPendapatan: 0,
  });

  useEffect(() => {
    fetchStatistik();
  }, []);

  const fetchStatistik = async () => {
    try {
      const data = await getStatistikOwner();
      setStatistik(data);
    } catch (err) {
      console.error('Gagal mengambil statistik', err);
    }
  };

  return (
    <div className="owner-container">
      <SidebarOwner />
      <div className="owner-main">
        <Topbar />
        <div className="dashboard-content">
          <h1>Dashboard</h1>

          <div className="stats">
            <div className="stat-box outline">
              <h4>Pesanan Hari Ini</h4>
              <p>{statistik.jumlahPesananHariIni}</p>
            </div>
            <div className="stat-box outline">
              <h4>Pendapatan Hari Ini</h4>
              <p>Rp {statistik.pendapatanHariIni.toLocaleString()}</p>
            </div>
            <div className="stat-box outline">
              <h4>Total Pendapatan</h4>
              <p>Rp {statistik.totalPendapatan.toLocaleString()}</p>
            </div>
          </div>

          {/* Dummy chart tetap bisa ditampilkan */}
          <div className="chart-section">
            <h2>Pendapatan Selama 30 Hari Kebelakang</h2>
            <div className="chart-placeholder">
              <p>[Grafik Dummy Placeholder]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
