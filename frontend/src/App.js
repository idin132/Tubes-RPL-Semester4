import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute";
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
import OwnerPage from "./pages/owner/OwnerPage";
import OwnerMejaPage from "./pages/owner/OwnerMejaPage";
import RiwayatTransaksiOwner from "./pages/owner/RiwayatTransaksiOwner";
import OwnerMenuPage from "./pages/owner/OwnerMenuPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* untuk hak akses kasir */}
      <Route
        path="/kasir"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <KasirPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/daftar-pesanan"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <DaftarPesananKasir />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/riwayat-transaksi"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <RiwayatTransaksi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/pembayaran/:id"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <PembayaranKasir />
          </ProtectedRoute>
        }
      />

      <Route
        path="/struk/:id"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <StrukTransaksi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kasir/struk/:id"
        element={
          <ProtectedRoute allowedRoles={["kasir", "owner"]}>
            <StrukWrapper />
          </ProtectedRoute>
        }
      />

      {/* Untuk hak akses Pelayan */}

      <Route
        path="/pelayan"
        element={
          <ProtectedRoute allowedRoles={["pelayan", "owner"]}>
            <PelayanPage />
          </ProtectedRoute>
        }
      />

      {/* Untuk hak akses Koki */}

      <Route
        path="/koki/menu"
        element={
          <ProtectedRoute allowedRoles={["koki", "owner"]}>
            <DaftarMenuKoki />
          </ProtectedRoute>
        }
      />

      <Route
        path="/koki/pesanan"
        element={
          <ProtectedRoute allowedRoles={["koki", "owner"]}>
            <DaftarPesananKoki />
          </ProtectedRoute>
        }
      />

      {/* Untuk hak akses owner */}

      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/meja"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerMejaPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/riwayat-transaksi"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <RiwayatTransaksiOwner />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/menu"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerMenuPage />
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
