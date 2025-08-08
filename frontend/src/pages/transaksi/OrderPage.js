import React, { useEffect, useState } from "react";
import { getMenus, createTransaksi } from "../../services/api";
import MenuCard from "../../components/MenuCard";
import "../../assets/OrderPage.css";

const OrderPage = () => {
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [namaPelanggan, setNamaPelanggan] = useState("");
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

  const categories = [
    { label: "Semua Menu", value: "Semua" },
    { label: "Makanan", value: "Makanan" },
    { label: "Minuman", value: "Minuman" },
    { label: "Camilan", value: "Camilan" }, // samakan ejaan dengan DB
    { label: "Paket Hemat", value: "Paket Hemat" },
  ];

  const filteredMenus = menus.filter((m) =>
    selectedCategory === "Semua"
      ? true
      : (m.kategori || "").toLowerCase() === selectedCategory.toLowerCase()
  );

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
      setNamaPelanggan("");
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
    <div className="luar">
      {/* Navigasi */}
      <div className="navbar-cst">
        <div className="navbar-title-cst">DineFlow</div>
        <nav>
          <a className="a-custom-cst" href="../">
            Beranda
          </a>
          <a className="a-custom-cst" href="../">
            Tentang Kami
          </a>
          <a
            className="a-custom-x-cst"
            href="https://wa.me/6287876798623"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kontak
          </a>
        </nav>
      </div>

      <div className="header-cst">
        <div className="header-title-cst">Daftar Menu</div>
      </div>

      <div className="order-page-cst">
        {/* <div className="kategori-area">
          <button className="btn-kategori active">
            <i class="fa-solid fa-box-open"></i> Semua Menu
          </button>
          <button className="btn-kategori">
            <i class="fa-solid fa-box-open"></i> Makanan
          </button>
          <button className="btn-kategori">
            <i class="fa-solid fa-box-open"></i> Minuman
          </button>
          <button className="btn-kategori">
            <i class="fa-solid fa-box-open"></i> Camilan
          </button>
          <button className="btn-kategori">
            <i class="fa-solid fa-box-open"></i> Paket Hemat
          </button>
          <div className="menu-area-cst">
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id_menu} menu={menu} onAdd={addToCart} />
            ))}
          </div>
        </div> */}
        <div className="kategori-area">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`btn-kategori ${
                selectedCategory === cat.value ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              <i className="fa-solid fa-box-open"></i> {cat.label}
            </button>
          ))}

          <div className="menu-area-cst">
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id_menu} menu={menu} onAdd={addToCart} />
            ))}
          </div>
        </div>

        <div className="order-area-cst">
          <div className="input-group-cst">
            <label htmlFor="nama">Nama Pelanggan</label>
            <input
              className="input-nama"
              type="text"
              id="nama"
              placeholder="Masukkan Nama Anda"
              value={namaPelanggan}
              onChange={(e) => setNamaPelanggan(e.target.value)}
            />
          </div>

          <h3 className="pesan-title">Order Menu</h3>
          <div className="order-items-scrollable">
            {cart.map((item) => (
              <div className="order-item-cst" key={item.id_menu}>
                <img
                  src={item.gambar || "../../assets/gambar/makanan.jpeg"}
                  alt={item.nama_menu}
                />
                <div className="order-info-cst">
                  <strong>{item.nama_menu}</strong>
                  <p>Rp{item.harga_menu.toLocaleString()}</p>
                </div>
                <div className="order-controls-cst">
                  <button onClick={() => updateJumlah(item.id_menu, -1)}>
                    -
                  </button>
                  <span>{item.jumlah}</span>
                  <button onClick={() => updateJumlah(item.id_menu, 1)}>
                    +
                  </button>
                </div>
                <button
                  className="remove-btn-cst"
                  onClick={() => removeFromCart(item.id_menu)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="hr-summary"></div>

          <div className="order-summary-cst">
            <p className="biaya-layanan-kiri">
              Biaya Layanan{" "}
              <strong className="biaya-layanan-kanan">
                Rp{serviceFee.toLocaleString()}
              </strong>
            </p>
            <p className="total-harga-kiri">
              Total Harga{" "}
              <strong className="total-harga-kanan">
                Rp{(totalHarga + serviceFee).toLocaleString()}
              </strong>
            </p>
            <button
              className="checkout-btn-cst"
              onClick={() => setShowConfirm(true)}
            >
              Pesan Sekarang
            </button>
          </div>
        </div>

        {/* Konfirmasi Checkout */}
        {showConfirm && (
          <div
            className="confirm-overlay-cst"
            onClick={() => setShowConfirm(false)}
          >
            <div
              className="confirm-box-cst"
              onClick={(e) => e.stopPropagation()}
            >
              <p>Pesanan sudah sesuai?</p>
              <div className="confirm-buttons-cst">
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
    </div>
  );
};

export default OrderPage;
