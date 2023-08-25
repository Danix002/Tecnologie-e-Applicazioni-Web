-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2023 at 12:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pastificio`
--

-- --------------------------------------------------------

--
-- Table structure for table `acquisto`
--

CREATE TABLE `acquisto` (
  `id` int(11) NOT NULL,
  `utente` int(11) NOT NULL,
  `prodotto` int(11) NOT NULL,
  `data_acquisto` date NOT NULL,
  `indirizzo_consegna` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `acquisto`
--

INSERT INTO `acquisto` (`id`, `utente`, `prodotto`, `data_acquisto`, `indirizzo_consegna`) VALUES
(63, 103, 15, '2023-04-26', 'Via le mani dal naso, 2'),
(64, 103, 21, '2023-04-26', 'Via le mani dal naso, 2'),
(68, 103, 11, '2023-04-26', 'Via Gnegne, 23'),
(69, 103, 12, '2023-04-26', 'Via Gnegne, 23'),
(70, 103, 14, '2023-04-26', 'Via Gnegne, 23'),
(71, 103, 5, '2023-04-26', 'Via Gnegno, 23'),
(72, 103, 8, '2023-04-26', 'Via Gnegno, 23'),
(73, 103, 18, '2023-04-26', 'Via Gnegno, 23'),
(99, 100, 2, '2023-05-06', 'Via le mani dal naso, 9'),
(100, 100, 3, '2023-05-06', 'Via le mani dal naso, 9'),
(101, 100, 13, '2023-05-06', 'Via le mani dal naso, 9'),
(102, 100, 5, '2023-05-15', 'Via dei disperati, 68'),
(103, 100, 8, '2023-05-15', 'Via dei disperati, 68'),
(104, 100, 15, '2023-05-15', 'Via dei disperati, 68'),
(105, 100, 18, '2023-05-15', 'Via dei disperati, 68');

-- --------------------------------------------------------

--
-- Table structure for table `carrello`
--

CREATE TABLE `carrello` (
  `utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `carrello`
--

INSERT INTO `carrello` (`utente`) VALUES
(100),
(103);

-- --------------------------------------------------------

--
-- Table structure for table `inserimento`
--

CREATE TABLE `inserimento` (
  `carrello` int(11) NOT NULL,
  `prodotto` int(11) NOT NULL,
  `data_inserimento` date NOT NULL,
  `ora_inserimento` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inserimento`
--

INSERT INTO `inserimento` (`carrello`, `prodotto`, `data_inserimento`, `ora_inserimento`) VALUES
(103, 3, '2023-05-02', '20:33:46'),
(103, 5, '2023-05-02', '20:33:50'),
(103, 15, '2023-05-02', '14:22:21');

-- --------------------------------------------------------

--
-- Table structure for table `prodotto`
--

CREATE TABLE `prodotto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descrizione` text NOT NULL,
  `prezzo` float NOT NULL,
  `regione` varchar(100) NOT NULL,
  `inOfferta` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `prodotto`
--

INSERT INTO `prodotto` (`id`, `nome`, `descrizione`, `prezzo`, `regione`, `inOfferta`) VALUES
(1, 'Polenta con la fonduta', 'Ingredienti: latte, farina di mais, fontina, uova, olio extravergine d\'oliva, sale iodato', 8.5, 'Valle D\'Aosta', 0),
(2, 'Plin con sugo d\'arrosto', 'Ingredienti: farina 00, polpa di vitello, carote, vino bianco, sale iodato, pepe nero', 10, 'Piemonte', 20),
(3, 'Trofie al pesto', 'Ingredienti: farina 00, parmigiano reggiano, pecorino sardo, pinoli, foglie di basilico, aglio, olio extravergine d\'oliva', 7, 'Liguria', 0),
(4, 'Risotto allo zafferano', 'Ingredienti: zafferano, burro, grana padano DOP', 5, 'Lombardia', 0),
(5, 'Bucatini con stracchino e speck', 'Ingredienti: latte, pecorino sardo, parmiggiano reggiano, stracchino, olio extravergine d\'oliva, speck IPG alto adige', 10, 'Trentino Alto Adige', 20),
(6, 'Tagliolini al formaggio di fossa e pancetta', 'Ingredienti: formaggio di fossa stagionato, pancetta affumicata, olio extravergine d\'oliva, olio aromatizzato al peperoncino, pepe nero', 10, 'Veneto', 0),
(7, 'Gnocchi di zucca', 'Ingredienti: zucca, patate, timo, pepe in grani, farina 00, burro, prosciutto crudo san Daniele, funghi porcini', 8.5, 'Friuli-Venezia-Giulia', 0),
(8, 'Lasagne alla bolognese', 'Ingredienti: farina 00, semola di grano duro, spinaci, uova, carne bovina, pancetta, sedano, carote, passata di pomodoro, olio extravergine d\'oliva, besciamella', 7.5, 'Emilia-Romagna', 20),
(9, 'Piciu\'', 'Ingredienti: farina di grano dura, semola di grano duro, olio extravergina d\'oliva, vino bianco, salsiccia, arancia, parmiggiano reggiano, peperoncino, aglio', 8, 'Toscana', 0),
(10, 'Passatelli in brodo', 'Ingredienti: uova, parmiggiano reggiano DOP, noce moscata, brodo di carne, pangrattato, scorza di limone, farina 00', 8, 'Umbria', 0),
(11, 'Maccheroni alla pecorara', 'Ingredienti: farina 00, guanciale, uova, cipolla bianca, passata di pomodoro, zucchine, ricotta, pecorino, olio extravergine d\'oliva, carote', 9.5, 'Abruzzo', 0),
(12, 'Ravioli scapolesi', 'Ingredienti: farina 00, uova, olio extravergine d\'oliva, patate, bietola, parmigiano reggiano, carne macinata di manzo e maiale, pancetta, prosciutto crudo, scamorza', 6.5, 'Molise', 0),
(13, 'Carbonara', 'Ingredienti: farina 00, uova, pecorino romano DOP, parmigiano reggiano, guanciale, pepe nero in grani, olio extravergine d\'oliva', 10, 'Lazio', 20),
(14, 'Scialiatelli con sugo e ricotta', 'Ingredienti: farina 00, passata di pomodoro, basilico fresco, olio extravergine d\'oliva, ricotta', 5, 'Campania', 0),
(15, 'Trittico lucano al ragu\'', 'Ingredienti: farina 00, olio extravergine d\'oliva, passata di pomodoro, pomodorini datterini, macinato', 8, 'Basilicata', 10),
(16, 'Orecchiette con le cime di rapa', 'Ingredienti: farina 00, semola di grano duro, uova, olio extravergine d\'oliva, cime di rapa, pangrattato, aglio, acciughe sott\'olio', 7, 'Puglia', 0),
(17, 'Pennette all\'arrabbiata', 'Ingredienti: farina 00, passata di pomodoro, pomodorini datterini, aglio, prezzemolo, nduja', 6, 'Calabria', 0),
(18, 'Linguine con le vongole', 'Ingredienti: farina 00, vongole veraci, pomodorini datterini, vino bianco, pepe nero in grani, olio extravergine d\'oliva, prezzemolo', 10, 'Sicilia', 20),
(19, 'Fregola ai frutti di mare', 'Ingredienti: fregola sarda, vongole veraci, cozze, gamberi, seppie, calamari, pomodorini datterini, vino bianco, olio extravergine d\'oliva, prezzemolo, aglio, peperoncino rosso', 15, 'Sardegna', 0),
(20, 'Calcioni al ragu\' marchigiano', 'Ingredienti: sedano, farina 00, cipolla, carota, chiodo di garofano, pancetta, salsiccia, macinato, vino bianco, passata di pomodoro, olio extravergine d\'oliva', 8, 'Marche', 0),
(21, 'Mezze maniche Patric stella', 'Ingredienti: farina 00, semola di grano duro, latte, pecorino romano DOP, parmigiano reggiano DOP, olio extravergine d\'oliva, philadelphia, salame lucano, pepe nero in grani', 10.5, 'Atlantide', 0),
(22, 'Pennette alla Carminuzzo', 'Ingredienti: farina 00, semola di grano duro, olio extravergine d\'oliva, panna, parmigiano reggiano DOP, piselli, salsiccia, funghi porcini, pepe nero in grani', 9, 'Rocket League', 0),
(23, 'Spaghetti di Andrea pera', 'Ingredienti: farina 00, semola di grano duro, passata di pomodoro, cinghiale, sedano, aglio, cipolla bianca, carota, olio extravergine d\'oliva', 9, 'Young Rapanello', 0),
(24, 'Maccheroni Alessandrino', 'Ingredienti: farina 00, semola di grano duro, cavolfiori, olio extravergine d\'oliva, vino bianco, pecorino romano DOP', 9, 'Terre dei fuochi', 0);

-- --------------------------------------------------------

--
-- Table structure for table `utente`
--

CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pwd_utente` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nome` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cognome` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `utente`
--

INSERT INTO `utente` (`id`, `email`, `pwd_utente`, `nome`, `cognome`, `telefono`, `isAdmin`) VALUES
(1, 'daniela.magri@edu.unito.it', 'b6b85e4cf8a057811d8ca1923d427a98', 'Daniela', 'Magrì', '+39 3663268947', 1),
(100, 'affamato@gmail.com', 'dda301e1e4f7deb75bc0b8fb34b7b807', 'Marco', 'Miccoli', '+39 3457956432', 0),
(103, 'stellaMarina@gmail.com', '9ea4b0a972a42226115a69200048abe2', 'Patrick', 'Stella', '+39 3895432243', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acquisto`
--
ALTER TABLE `acquisto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente` (`utente`),
  ADD KEY `prodotto` (`prodotto`);

--
-- Indexes for table `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`utente`);

--
-- Indexes for table `inserimento`
--
ALTER TABLE `inserimento`
  ADD PRIMARY KEY (`carrello`,`prodotto`,`ora_inserimento`),
  ADD KEY `prodotto` (`prodotto`);

--
-- Indexes for table `prodotto`
--
ALTER TABLE `prodotto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acquisto`
--
ALTER TABLE `acquisto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `prodotto`
--
ALTER TABLE `prodotto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `acquisto`
--
ALTER TABLE `acquisto`
  ADD CONSTRAINT `acquistoInToProdotto` FOREIGN KEY (`prodotto`) REFERENCES `prodotto` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `acquistoInToUtente` FOREIGN KEY (`utente`) REFERENCES `utente` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `carrelloInToUtente` FOREIGN KEY (`utente`) REFERENCES `utente` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `inserimento`
--
ALTER TABLE `inserimento`
  ADD CONSTRAINT `inserimentoInToCarrello` FOREIGN KEY (`carrello`) REFERENCES `carrello` (`utente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `inserimentoInToProdotto` FOREIGN KEY (`prodotto`) REFERENCES `prodotto` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
