-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2025 at 04:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_furniture`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_furniture`
--

CREATE TABLE `tbl_furniture` (
  `id_furniture` varchar(10) NOT NULL,
  `nama_furniture` varchar(100) NOT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `bahan` varchar(50) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `dimensi` varchar(50) DEFAULT NULL,
  `warna` varchar(30) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_furniture`
--

INSERT INTO `tbl_furniture` (`id_furniture`, `nama_furniture`, `kategori`, `bahan`, `harga`, `stok`, `dimensi`, `warna`, `image`) VALUES
('F001', 'Kursi Minimalis', 'Kursi', 'Kayu Jati', 450000, 12, '45 x 45 x 85 cm', 'Coklat', '/uploads/1763689554306-1.jpg'),
('F002', 'Meja Kerja Modern', 'Meja', 'MDF + Besi', 1250000, 5, '120 x 60 x 75 cm', 'Hitam', '/uploads/1763725597464-2.jpg'),
('F003', 'Lemari Pakaian 2 Pintu', 'Lemari', 'Kayu Mahoni', 2750000, 3, '100 x 55 x 180 cm', 'Putih', '/uploads/1763725660481-3.webp'),
('F004', 'Rak Buku 5 Susun', 'Rak', 'Kayu Pinus', 950000, 7, '80 x 30 x 170 cm', 'Natural', '/uploads/1763725692681-4.jpg'),
('F005', 'Sofa 2 Dudukan', 'Sofa', 'Kain + Kayu', 3200000, 4, '160 x 80 x 85 cm', 'Abu-abu', '/uploads/1763725726343-5.jpg'),
('F006', 'Meja Makan Bundar', 'Meja', 'Kayu Jati', 1800000, 2, 'Diameter 100 cm', 'Coklat Tua', '/uploads/1763725776974-6.jpg'),
('F007', 'Tempat Tidur Queen', 'Kasur/Bed', 'Kayu + Busa', 4500000, 1, '200 x 160 x 110 cm', 'Hitam', NULL),
('F008', 'Kabinet TV Minimalis', 'Kabinet', 'MDF', 900000, 6, '140 x 40 x 45 cm', 'Putih', NULL),
('F009', 'Rak Buku Lengkung', 'Rak', 'Kayu MDF', 850000, 5, '60 x 35 x 180 cm', 'Putih & Hijau Pastel', NULL),
('F010', 'Tempat Tidur Single Storage', 'Tempat Tidur', 'Kayu MDF', 3200000, 3, '205 x 100 x 90 cm', 'Putih & Pink', NULL),
('F011', 'Lemari Pink Anak', 'Lemari', 'Kayu MDF', 2800000, 4, '120 x 45 x 185 cm', 'Pink & Putih', NULL),
('F012', 'Meja Rias Dinding Pink', 'Meja Rias', 'Kayu MDF', 1500000, 6, '80 x 20 x 60 cm', 'Pink', NULL),
('F013', 'Rak Gantung Baju Star', 'Rak Baju', 'Kayu & Besi', 450000, 8, '50 x 40 x 120 cm', 'Ungu Pastel & Biru Pastel', NULL),
('F014', 'Meja Mini Flower Pink', 'Meja', 'Kayu MDF', 350000, 7, '40 x 40 x 45 cm', 'Pink', NULL),
('F015', 'Meja Mini Flower Purple', 'Meja', 'Kayu MDF', 350000, 7, '40 x 40 x 45 cm', 'Ungu', NULL),
('F016', 'Rak Dinding Lengkung Biru', 'Rak Dinding', 'Kayu MDF', 650000, 6, '60 x 20 x 80 cm', 'Biru', NULL),
('F017', 'Rak Buku Lengkung Minimalis Putih', 'Rak Buku', 'Besi', 950000, 5, '45 x 30 x 170 cm', 'Putih', NULL),
('F018', 'Rak Buku Lengkung Minimalis Abu', 'Rak Buku', 'Besi', 950000, 5, '45 x 30 x 170 cm', 'Abu', NULL),
('F019', 'Rak Buku Lengkung Minimalis Hijau Mint', 'Rak Buku', 'Besi', 950000, 5, '45 x 30 x 170 cm', 'Hijau Mint', NULL),
('F020', 'Rak Buku Lengkung Minimalis Pink', 'Rak Buku', 'Besi', 950000, 5, '45 x 30 x 170 cm', 'Pink', NULL),
('F021', 'Lampu Dinding Amber Dome', 'Lampu Dinding', 'Kaca & Besi', 550000, 8, '25 x 15 x 20 cm', 'Amber', NULL),
('F022', 'Kursi Jamur Plush', 'Kursi', 'Kain Plush & Foam', 780000, 4, '55 x 45 x 45 cm', 'Hijau & Merah', NULL),
('F023', 'Lampu Dinding Flower Petal', 'Lampu Dinding', 'Kaca Frosted & Besi', 480000, 10, '22 x 18 x 25 cm', 'Hijau & Putih', NULL),
('F024', 'Kursi gaming', 'Kursi', 'MDF BESI', 500000, 9, '45 x 45 x 90', 'Hitam', ''),
('F025', 'meja', 'MEJA', 'kayu', 123, 5, '120 x 45 x 45', 'hitam dan putih', '');


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'ItzKevinz', 'tesgmail@gmail.com', '$2b$10$vo9GGrqO/SbD/Vdw9jVjRelTP9qsCOc/aMOxSDR1C/3aWzWA2qoFW'),
(2, 'rifana', 'tesemail@gmail.com', '$2b$10$r4vKs6IorsnXd48HA3Hnp.zTU8l/U2U.RkaLd8IllzX6h3twDKfM.'),
(3, 'cipaa', 'tik.kevin123456789@gmail.com', '$2b$10$tPQGfSq27lisa3l9JPJF1eJ5afXH4aNL6igAABZvDu3kituPDjbHW'),
(4, 'Kevinz', 'kevin@gmail.com', '$2b$10$m13jAdj0V7QkOnSXkNprIeLiWOj614MIf5jI0nTpmVaUoCSBQi5/K'),
(5, 'admin', 'admin@gmail.com', '$2b$10$XYyFAFnrOz14AkTL5kGVM.Q9wGci1Ne4TnYtt9SQABEs6gjDaiPIu'),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_furniture`
--
ALTER TABLE `tbl_furniture`
  ADD PRIMARY KEY (`id_furniture`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
