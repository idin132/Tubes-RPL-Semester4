import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/menu/MenuPage';
import LoginPage from './pages/login/LoginPage';
import KasirPage from './pages/kasir/KasirPage';
import PelayanPage from './pages/pelayan/PelayanPage';
import OrderPage from './pages/transaksi/OrderPage';

function App() {
  return (
    <Routes>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kasir" element={<KasirPage />} />
      <Route path="/pelayan" element={<PelayanPage />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
}

export default App;
