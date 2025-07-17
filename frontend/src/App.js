import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from  "../src/components/ProtectedRoute";
import MenuPage from "./pages/menu/MenuPage";
import LoginPage from "./pages/login/LoginPage";
import KasirPage from "./pages/kasir/KasirPage";
import PelayanPage from "./pages/pelayan/PelayanPage";
import OrderPage from "./pages/transaksi/OrderPage";
import DaftarPesananKasir from "./pages/kasir/DaftarPesananKasir";
import PembayaranKasir from "./pages/kasir/PembayaranKasir";
import StrukTransaksi from "./components/StrukTransaksi";
import StrukWrapper from "./pages/kasir/StrukWrapper";
import LandingPage from "./components/LandingPage";
import RiwayatTransaksi from "./pages/kasir/RiwayatTransaksi";
import DaftarMenuKoki from "./pages/koki/DaftarMenuKoki";
import DaftarPesananKoki from "./pages/koki/DaftarPesananKoki";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* untuk hak akses kasir */}
      <Route
        path="/kasir"
        element={
          <ProtectedRoute allowedRole="kasir">
            <KasirPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/daftar-pesanan"
        element={
          <ProtectedRoute allowedRole="kasir">
            <DaftarPesananKasir />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/riwayat-transaksi"
        element={
          <ProtectedRoute allowedRole="kasir">
            <RiwayatTransaksi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/pembayaran/:id"
        element={
          <ProtectedRoute allowedRole="kasir">
            <PembayaranKasir />
          </ProtectedRoute>
        }
      />

      <Route
        path="/struk/:id"
        element={
          <ProtectedRoute allowedRole="kasir">
            <StrukTransaksi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/struk/:id"
        element={
          <ProtectedRoute allowedRole="kasir">
            <StrukWrapper />
          </ProtectedRoute>
        }
      />

      {/* Untuk hak akses Pelayan */}

      <Route
        path="/pelayan"
        element={
          <ProtectedRoute allowedRole="pelayan">
            <PelayanPage />
          </ProtectedRoute>
        }
      />

      {/* Untuk hak akses Koki */}

      <Route
        path="/koki/menu"
        element={
          <ProtectedRoute allowedRole="koki">
            <DaftarMenuKoki />
          </ProtectedRoute>
        }
      />

      <Route
        path="/koki/pesanan"
        element={
          <ProtectedRoute allowedRole="koki">
            <DaftarPesananKoki />
          </ProtectedRoute>
        }
      />

      {/* Untuk yang tidak perlu hak akses */}

      <Route path="/menu" element={<MenuPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/" element={<LandingPage />} />

      <Route path="/unauthorized" element={<h1>Akses Ditolak</h1>} />
    </Routes>
  );
}

export default App;
