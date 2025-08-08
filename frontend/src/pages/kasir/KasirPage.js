import React from 'react';
import SidebarKasir from '../../components/SidebarKasir';
import '../../assets/kasir.css';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Topbar from "../../components/Topbar";
// import Topbar from '../../components/Topbar';
import { getStatistikKasir } from '../../services/api';

const KasirPage = () => {
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
      const data = await getStatistikKasir();
      setStatistik(data);
    } catch (err) {
      console.error('Gagal mengambil statistik', err);
    }
  };

  return (
    <div className="kasir-container">
      <SidebarKasir />
      <div className="kasir-main">
        <Topbar />
        <div className="dashboard-content-kasir">

          <div className="card-content-kasir">
            {/* Judul Page */}
            <h1>Dashboard</h1>
            <div className="hr-judul"></div>

            <div className="stats-kasir">

              <div className="stat-box-kasir green-kasir">
                <h4>Pendapatan Hari Ini</h4>
                <p>Rp {statistik.pendapatanHariIni.toLocaleString()}</p>
              </div>

              <div className="stat-box-kasir yellow-kasir">
                <h4>Pesanan Hari Ini</h4>
                <p><i class="fa-solid fa-clipboard-list icon-stat"></i> {statistik.jumlahPesananHariIni}</p>
              </div>

              <div className="stat-box-kasir outline-kasir">
                <h4>Total Pendapatan</h4>
                <p>Rp {statistik.totalPendapatan.toLocaleString()}</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default KasirPage;
