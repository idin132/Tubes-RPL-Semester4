import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/StrukTransaksi.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StrukTransaksi = ({ transaksi, onClose }) => {
  const navigate = useNavigate();
  const componentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: `Struk_Pembayaran_${transaksi.id_transaksi}`,
  // });

  const handleBatal = () => {
    if (onClose) onClose();
    navigate("/kasir/daftar-pesanan");
  };

  const handleDownloadPDF = () => {
    const element = componentRef.current;
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Custom ukuran struk: lebar 80mm (sekitar 226pt), tinggi dinamis
      const pdfWidth = 80; // mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Struk_Pembayaran_${transaksi.id_transaksi}.pdf`);
    });
  };

  return (
    <div className="struk-wrapper">
      <div ref={componentRef} className="struk-box">
        <h2>🍽 DineFlow</h2>
        <p>Jl. Restoran No.123, Kota Kuliner</p>
        <hr />
        <p>
          <strong>No Transaksi:</strong> #{transaksi.id_transaksi}
        </p>
        <p>
          <strong>Meja:</strong> {transaksi.id_meja}
        </p>
        <p>
          <strong>Nama:</strong> {transaksi.nama_pelanggan}
        </p>
        <p>
          <strong>Tanggal:</strong>{" "}
          {new Date(transaksi.tanggal_transaksi).toLocaleString()}
        </p>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Menu</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.detail_transaksis.map((item, index) => (
              <tr key={index}>
                <td>{item.menu?.nama_menu}</td>
                <td>{item.jumlah}</td>
                <td>Rp {item.sub_total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <p>Service Fee: Rp {transaksi.service_fee?.toLocaleString() || 1000}</p>
        <p>
          Total: <strong>Rp {transaksi.grand_total.toLocaleString()}</strong>
        </p>
        <p>
          Bayar: <strong>Rp {transaksi.uang_bayar.toLocaleString()}</strong>
        </p>
        <p>
          Kembalian:{" "}
          <strong>
            Rp {(transaksi.uang_bayar - transaksi.grand_total).toLocaleString()}
          </strong>
        </p>
        <hr />
        <p>Terima kasih telah berkunjung!</p>
      </div>

      <button className="btn-cetak" onClick={handleDownloadPDF}>
        💾 Simpan PDF
      </button>
      <button onClick={handleBatal} className="btn batal">
        Kembali
      </button>
    </div>
  );
};

export default StrukTransaksi;
