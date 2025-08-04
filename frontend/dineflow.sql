-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 28, 2025 at 08:49 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dineflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int NOT NULL,
  `id_transaksi` int DEFAULT NULL,
  `id_menu` int NOT NULL,
  `jumlah` int DEFAULT NULL,
  `sub_total` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_menu`, `jumlah`, `sub_total`) VALUES
(4, 1, 3, 5, 125000),
(5, 1, 4, 4, 120000),
(6, 1, 5, 3, 24000),
(7, 2, 3, 4, 100000),
(8, 3, 4, 5, 150000),
(9, 3, 3, 5, 125000),
(10, 4, 5, 1, 8000),
(11, 4, 4, 1, 30000),
(12, 4, 3, 2, 50000),
(13, 5, 3, 2, 50000),
(14, 5, 4, 2, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `meja`
--

CREATE TABLE `meja` (
  `id_meja` int NOT NULL,
  `nomor_meja` varchar(255) NOT NULL,
  `status_meja` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meja`
--

INSERT INTO `meja` (`id_meja`, `nomor_meja`, `status_meja`) VALUES
(1, '1', 'terisi'),
(2, '2', 'tersedia'),
(3, '3', 'terisi'),
(4, '4', 'tersedia'),
(5, '5', 'terisi'),
(6, '6', 'tersedia'),
(7, '7', 'terisi'),
(8, '8', 'tersedia'),
(9, '9', 'terisi'),
(10, '10', 'tersedia'),
(11, '11', 'tersedia'),
(12, '12', 'tersedia'),
(13, '13', 'tersedia'),
(14, '14', 'tersedia'),
(15, '15', 'tersedia'),
(16, '16', 'tersedia'),
(17, '17', 'tersedia'),
(18, '18', 'tersedia'),
(19, '19', 'tersedia'),
(20, '20', 'tersedia'),
(21, '21', 'tersedia'),
(22, '22', 'tersedia'),
(23, '23', 'tersedia'),
(24, '24', 'tersedia'),
(25, '25', 'tersedia'),
(26, '26', 'tersedia'),
(27, '27', 'tersedia'),
(28, '28', 'tersedia'),
(29, '29', 'tersedia'),
(30, '30', 'tersedia'),
(31, '31', 'tersedia'),
(32, '32', 'tersedia'),
(33, '33', 'tersedia'),
(34, '35', 'tersedia'),
(35, '36', 'tersedia'),
(36, '37', 'tersedia'),
(37, '38', 'tersedia'),
(38, '39', 'tersedia'),
(39, '40', 'tersedia'),
(40, '41', 'tersedia'),
(41, '42', 'tersedia'),
(42, '43', 'tersedia'),
(43, '44', 'tersedia'),
(44, '45', 'tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int NOT NULL,
  `nama_menu` varchar(255) NOT NULL,
  `harga_menu` int NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `status_menu` varchar(255) NOT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `harga_menu`, `kategori`, `status_menu`, `deskripsi`) VALUES
(1, 'Ayam Taliwang', 15000, 'makanan', 'Tersedia', 'ayam dengan bumbu taliwang'),
(3, 'Nasi Goreng Spesial', 25000, 'Makanan', 'Tersedia', 'Nasi goreng dengan telur, ayam, dan kerupuk'),
(4, 'Ayam Bakar Madu', 30000, 'Makanan', 'Tersedia', 'Ayam bakar dengan saus madu khas'),
(5, 'Es Teh Manis', 8000, 'Minuman', 'Tersedia', 'Teh manis dingin dengan es batu'),
(6, 'Jus Alpukat', 15000, 'Minuman', 'Tersedia', 'Jus alpukat segar dengan susu kental manis'),
(7, 'Sate Ayam', 21000, 'Makanan', 'Tersedia', '10 tusuk sate ayam dengan lontong dan sambal kacang'),
(8, 'Soto Ayam', 22000, 'Makanan', 'Tersedia', 'Soto ayam bening dengan nasi dan sambal'),
(9, 'Mie Goreng Jawa', 23000, 'Makanan', 'Tersedia', 'Mie goreng khas Jawa dengan topping ayam dan sayur'),
(10, 'Kopi Hitam', 10000, 'Minuman', 'Tersedia', 'Kopi hitam panas tanpa gula'),
(11, 'Brownies Cokelat', 18000, 'Dessert', 'Tersedia', 'Brownies cokelat lembut dengan topping almond'),
(12, 'Pudding Cokelat', 16000, 'Dessert', 'Tersedia', 'Pudding cokelat dengan vla vanila'),
(13, 'Nasi Uduk Komplit', 27000, 'Makanan', 'Tersedia', 'Nasi uduk dengan ayam goreng, telur, tempe, dan sambal'),
(14, 'Teh Tarik Dingin', 12000, 'Minuman', 'Tersedia', 'Minuman teh tarik khas Malaysia dengan es'),
(15, 'Roti Bakar Cokelat Keju', 15000, 'cemilan', 'Tersedia', 'Roti bakar isi cokelat dan keju parut'),
(16, 'Lemon Tea', 9000, 'Minuman', 'Tersedia', 'Es teh segar dengan perasan lemon'),
(17, 'Bakso Kuah Urat', 24000, 'Makanan', 'Tersedia', 'Bakso urat dalam kuah kaldu sapi hangat');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int NOT NULL,
  `id_meja` int DEFAULT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT NULL,
  `metode_bayar` varchar(255) DEFAULT NULL,
  `uang_bayar` int DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  `status_pesanan` varchar(255) DEFAULT NULL,
  `status_pembayaran` varchar(255) DEFAULT NULL,
  `catatan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_meja`, `nama_pelanggan`, `tanggal_transaksi`, `metode_bayar`, `uang_bayar`, `grand_total`, `status_pesanan`, `status_pembayaran`, `catatan`) VALUES
(1, 1, 'Idin Naufal Hakim', '2025-07-17 09:07:04', 'cash', 300000, 270000, 'selesai', 'sudah bayar', ''),
(2, 1, 'Idin', '2025-07-18 03:06:59', 'cash', 120000, 101000, 'selesai', 'sudah bayar', ''),
(3, 10, 'Idin Naufal Hakim', '2025-07-18 05:49:53', 'cash', 300000, 276000, 'selesai', 'sudah bayar', ''),
(4, 10, 'Rizqi Bakar', '2025-07-25 09:17:49', '', 0, 89000, 'pending', 'belum bayar', ''),
(5, 1, 'Dwi Putra Juniargi', '2025-07-25 09:32:46', '', 0, 111000, 'pending', 'belum bayar', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama`, `role`, `username`, `password`) VALUES
(1, 'Kasir', 'kasir', 'kasirdineflow', '$2a$12$BQZxKzGV9Z9NJj9lW0HM4.VUHszAbDCbCyrrCXGuyV4lQ4q2jrGre'),
(2, 'pelayan', 'pelayan', 'pelayandineflow', '$2a$12$xJTydQiHam5vEbJl1mjDNurcJakZpdE8XSe.dX4WOYsMkHUUfxRe6'),
(3, 'koki', 'koki', 'kokidineflow', '$2a$12$cxD5BBRJxXY9S7hb.NEo0uBHjWYd8AjgAowAONx0OTL5V/8ZUfW7y'),
(4, 'Ujang Kedu', 'kasir', 'ujangkedu', '$2a$12$BQZxKzGV9Z9NJj9lW0HM4.VUHszAbDCbCyrrCXGuyV4lQ4q2jrGre'),
(5, 'Yang Maha Raja', 'owner', 'ownerdineflow', '$2a$12$xJTydQiHam5vEbJl1mjDNurcJakZpdE8XSe.dX4WOYsMkHUUfxRe6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`id_meja`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `meja`
--
ALTER TABLE `meja`
  MODIFY `id_meja` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_366` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_transaksi_ibfk_367` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
