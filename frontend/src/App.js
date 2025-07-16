import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/menu/MenuPage';
import LoginPage from './pages/login/LoginPage';
import KasirPage from './pages/kasir/KasirPage';
import PelayanPage from './pages/pelayan/PelayanPage';
import OrderPage from './pages/transaksi/OrderPage';
import DaftarPesananKasir from './pages/kasir/DaftarPesananKasir';
import PembayaranKasir from './pages/kasir/PembayaranKasir';
import StrukTransaksi from './components/StrukTransaksi';
import StrukWrapper from './pages/kasir/StrukWrapper';

function App() {
  return (
    <Routes>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kasir" element={<KasirPage />} />
      <Route path="/pelayan" element={<PelayanPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/kasir/daftar-pesanan" element={<DaftarPesananKasir />} />
      <Route path="/kasir/pembayaran/:id" element={<PembayaranKasir />} />
      <Route path="/struk/:id" element={<StrukTransaksi />} />
      <Route path="/kasir/struk/:id" element={<StrukWrapper />} />
    </Routes>
  );
}

export default App;
