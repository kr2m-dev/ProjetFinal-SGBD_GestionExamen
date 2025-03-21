-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 17 mars 2025 à 02:14
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `plateforme`
--

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

DROP TABLE IF EXISTS `classe`;
CREATE TABLE IF NOT EXISTS `classe` (
  `idClasse` int NOT NULL AUTO_INCREMENT,
  `nomClasse` varchar(100) NOT NULL,
  PRIMARY KEY (`idClasse`),
  UNIQUE KEY `nomClasse` (`nomClasse`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `copie`
--

DROP TABLE IF EXISTS `copie`;
CREATE TABLE IF NOT EXISTS `copie` (
  `idCopie` int NOT NULL AUTO_INCREMENT,
  `fichier` varchar(150) DEFAULT NULL,
  `note` double NOT NULL,
  `estPlagiat` tinyint(1) DEFAULT NULL,
  `idExamen` int DEFAULT NULL,
  PRIMARY KEY (`idCopie`),
  KEY `idExamen` (`idExamen`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `correction`
--

DROP TABLE IF EXISTS `correction`;
CREATE TABLE IF NOT EXISTS `correction` (
  `idCorrection` int NOT NULL AUTO_INCREMENT,
  `nomCorrige` varchar(150) NOT NULL,
  `idExamen` int DEFAULT NULL,
  PRIMARY KEY (`idCorrection`),
  UNIQUE KEY `nomCorrige` (`nomCorrige`),
  KEY `idExamen` (`idExamen`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

DROP TABLE IF EXISTS `enseignant`;
CREATE TABLE IF NOT EXISTS `enseignant` (
  `idEnseignant` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email_` varchar(100) NOT NULL,
  `motDepasse` varchar(100) DEFAULT NULL,
  `idClasse` int NOT NULL,
  `idExamen` int DEFAULT NULL,
  PRIMARY KEY (`idEnseignant`),
  UNIQUE KEY `email_` (`email_`),
  KEY `idClasse` (`idClasse`),
  KEY `idExamen` (`idExamen`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`idEnseignant`, `prenom`, `nom`, `email_`, `motDepasse`, `idClasse`, `idExamen`) VALUES
(1, 'Ibrahima', 'Fall', 'ifall@enseignant.com', '$2b$10$Q9Xl3OcOIVrWongYQpPQdOtD8iLWdUA5zpSpL28uDZscSZ4eHvsCS', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `idEtudiant` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email_` varchar(100) NOT NULL,
  `motDepasse` varchar(100) DEFAULT NULL,
  `idClasse` int DEFAULT NULL,
  PRIMARY KEY (`idEtudiant`),
  UNIQUE KEY `email_` (`email_`),
  KEY `idClasse` (`idClasse`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`idEtudiant`, `prenom`, `nom`, `email_`, `motDepasse`, `idClasse`) VALUES
(1, 'Fallou', 'seck', 'seck@test.com', '$2b$10$GYF1muy1zPdcnWCkqXADuepnwJ55oUP.PDsJhovTgFn3y32cGSEU.', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `examen`
--

DROP TABLE IF EXISTS `examen`;
CREATE TABLE IF NOT EXISTS `examen` (
  `idExamen` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) NOT NULL,
  `type` enum('Contr├┤le continu (CC)','Devoir surveill├® (DS)','Travaux dirig├®s (TD)','Travaux pratiques (TP)','Projets') DEFAULT NULL,
  `dateDebut` datetime DEFAULT NULL,
  `dateLimite` datetime NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `publie` tinyint(1) DEFAULT '0',
  `idEnseignant` int DEFAULT NULL,
  PRIMARY KEY (`idExamen`),
  KEY `idEnseignant` (`idEnseignant`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `examen`
--

INSERT INTO `examen` (`idExamen`, `titre`, `type`, `dateDebut`, `dateLimite`, `fichier`, `publie`, `idEnseignant`) VALUES
(1, 'IPDL', '', '2025-03-08 04:35:00', '2025-03-08 06:35:00', '1742099736670.pdf', 0, NULL),
(2, 'langage', '', '2025-03-26 09:40:00', '2025-03-26 15:25:00', '1742099924909.pdf', 1, 1),
(3, 'recherche Operationnelle', '', '2025-03-08 09:31:00', '2025-03-08 11:31:00', '1742117500086.pdf', 0, NULL),
(4, 'sgbd', '', '2025-03-16 09:41:00', '2025-03-16 10:15:00', '1742118078099.pdf', 0, 1),
(5, 'ppp', '', '2025-03-16 10:42:00', '2025-03-16 12:12:00', '1742123005710.pdf', 0, NULL),
(6, 'poo', '', '2025-03-16 11:07:00', '2025-03-16 12:07:00', '1742123274356.pdf', 0, NULL),
(7, 'Mathematique', 'Projets', '2025-04-01 00:00:00', '2025-04-10 00:00:00', '1742123523049.pdf', 0, NULL),
(8, 'algo', 'Travaux pratiques (TP)', '2025-03-16 11:19:00', '2025-03-16 12:04:00', '1742123998095.pdf', 0, 1),
(9, 'JAVA', '', '2025-03-16 21:53:00', '2025-03-16 22:19:00', '1742162011011.pdf', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE IF NOT EXISTS `matiere` (
  `idMatiere` int NOT NULL AUTO_INCREMENT,
  `nomMatiere` varchar(100) NOT NULL,
  `classe` int DEFAULT NULL,
  PRIMARY KEY (`idMatiere`),
  UNIQUE KEY `nomMatiere` (`nomMatiere`),
  KEY `classe` (`classe`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
