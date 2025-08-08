import React from "react";
import { Link } from "react-router-dom";
import "../assets/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <div className="navbar">
        <div className="navbar-title">DineFlow</div>
        <nav>
          <a className="a-custom" href="#beranda">Beranda</a>
          <a className="a-custom" href="#tentang-kami">Tentang Kami</a>
          <a
            className="a-custom-x"
            href="https://wa.me/6287876798623"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kontak
          </a>
        </nav>
      </div>


      {/* Hero Section */}
      <section className="hero" id="beranda">
        <div className="hero-text">
          <h1>
            Nikmati Hidangan Favoritmu, Sesuai Caramu!
          </h1>
          <p>Silahkan pesan sekarang untuk menikmati makanan hari ini. Kami siap melayani<br/> dengan sepenuh hati.</p>
          <div className="hero-buttons">
            <Link to="/order">
              <button className="pesan-sekarang">Pesan Sekarang</button>
            </Link>

            <Link to="/order">
              <button className="lihat-menu">Lihat Menu</button>
            </Link>
            
          </div>
        </div>

        <div className="hero-image">
          <img src="/gambar/ayam-baru.png" alt="el Taliwang" className="image-ayam" />
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="hero-2" id="tentang-kami">

        <div className="hero-image">
          <img src="/gambar/tentang-kami.png" alt="el Taliwang" className="image-resto" />
        </div>

        <div className="hero-text-2">
          <h1>
            Tentang Kami
          </h1>
          <p>
            Selamat datang di Restoran Pak Resto, tempat di mana cita rasa autentik dan kenikmatan kuliner bertemu dengan suasana yang hangat dan bersahabat. <br/> 
             <br/>Sejak didirikan, kami berkomitmen untuk menyajikan hidangan lezat dengan bahan-bahan berkualitas tinggi, dipadukan dengan pelayanan ramah yang membuat setiap kunjungan Anda berkesan. <br/>
             <br/><b><i>Visi Kami</i></b><br/>
             Menjadi restoran pilihan utama yang menghadirkan kebahagiaan melalui hidangan istimewa dan momen berharga bagi setiap pelanggan.
          </p>
        </div>
      </section>
    </div>

  );
};

export default LandingPage;
