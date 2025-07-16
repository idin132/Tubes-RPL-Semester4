import React from "react";
import { Link } from "react-router-dom";
import "../assets/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">🍴 DineFlow</div>
        <nav>
          <a href="#">Beranda</a>
          <a href="#">Tentang Kami</a>
          <a href="#">Kontak</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            All Delicious <span>Asian</span>
          </h1>
          <p>Eggs, Salad, fruits, pasta</p>
          <div className="hero-buttons">
            <Link to="/order">
              <button className="takeaway">Pesan Sekarang</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/gambar/salad.png" alt="Salad" className="image-salad" />
        </div>
      </section>

      {/* Menu Section Placeholder */}
      {/* <section className="menu-section">
        <h2>Our Delicious and Special Salad</h2>
        <h3>Asian</h3>
        <div className="menu-scroll">
          {[1, 2, 3, 4].map((item) => (
            <div className="menu-card" key={item}>
              <div className="menu-image">
                <img
                  src="/gambar/salad.png"
                  alt="Salad"
                  className="image-salad"
                />
              </div>
              <div className="menu-price">$12</div>
              <h4>Special Salad</h4>
              <p>
                Food is any substance consumed by an organism for nutritional
                support.
              </p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;
