import React, { useEffect, useState } from "react";
import { getMenus, createTransaksi } from "../../services/api";
import MenuCard from "../../components/MenuCard";
import "../../assets/OrderPage.css";

const OrderPage = () => {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mejaFromUrl = params.get("meja");
    if (mejaFromUrl) {
      localStorage.setItem("id_meja", mejaFromUrl);
    }
    getMenus().then(setMenus);
  }, []);

  const addToCart = (menu) => {
    const exist = cart.find((item) => item.id_menu === menu.id_menu);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id_menu === menu.id_menu
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...menu, jumlah: 1 }]);
    }
  };

  const removeFromCart = (id_menu) => {
    setCart(cart.filter((item) => item.id_menu !== id_menu));
  };

  const updateJumlah = (id_menu, delta) => {
    setCart(
      cart.map((item) =>
        item.id_menu === id_menu
          ? { ...item, jumlah: Math.max(1, item.jumlah + delta) }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    const id_meja = parseInt(localStorage.getItem("id_meja") || "0");
    if (!id_meja) return alert("ID Meja tidak ditemukan.");
    if (!namaPelanggan.trim()) return alert("Nama pelanggan wajib diisi.");

    const data = {
      id_meja,
      nama_pelanggan: namaPelanggan,
      metode_bayar: "",
      uang_bayar: 0,
      status_pesanan: "pending",
      status_pembayaran: "belum bayar",
      catatan: "",
      cart,
      service_fee: 1000,
    };

    try {
      await createTransaksi(data);
      alert("Pesanan berhasil dikirim!");
      setCart([]);
      setNamaPelanggan('');
      setShowConfirm(false);
    } catch (err) {
      alert("Gagal mengirim pesanan!");
    }
  };

  const serviceFee = 1000;
  const totalHarga = cart.reduce(
    (sum, item) => sum + item.harga_menu * item.jumlah,
    0
  );

  return (
    <div className="order-page">
      <div className="menu-area">
        {menus.map((menu) => (
          <MenuCard key={menu.id_menu} menu={menu} onAdd={addToCart} />
        ))}
      </div>

      <div className="order-area">
        <div className="input-group">
          <label htmlFor="nama">Nama Pelanggan</label>
          <input
            type="text"
            id="nama"
            placeholder="Masukkan nama Anda"
            value={namaPelanggan}
            onChange={(e) => setNamaPelanggan(e.target.value)}
          />
        </div>

        <h3>Order Menu</h3>
        {cart.map((item) => (
          <div className="order-item" key={item.id_menu}>
            <img
              src={item.gambar || "../../assets/gambar/makanan.jpeg"}
              alt={item.nama_menu}
            />
            <div className="order-info">
              <strong>{item.nama_menu}</strong>
              <p>Rp. {item.harga_menu.toLocaleString()}</p>
            </div>
            <div className="order-controls">
              <button onClick={() => updateJumlah(item.id_menu, -1)}>-</button>
              <span>{item.jumlah}</span>
              <button onClick={() => updateJumlah(item.id_menu, 1)}>+</button>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id_menu)}
            >
              ✖
            </button>
          </div>
        ))}

        <div className="order-summary">
          <p>
            Service: <strong>Rp. {serviceFee.toLocaleString()}</strong>
          </p>
          <p>
            Total:{" "}
            <strong>Rp. {(totalHarga + serviceFee).toLocaleString()}</strong>
          </p>
          <button
            className="checkout-btn"
            onClick={() => setShowConfirm(true)}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Konfirmasi Checkout */}
      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p>Pesanan sudah sesuai?</p>
            <div className="confirm-buttons">
              <button className="yes" onClick={handleCheckout}>
                Ya
              </button>
              <button className="no" onClick={() => setShowConfirm(false)}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
