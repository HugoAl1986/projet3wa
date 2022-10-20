-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 20 oct. 2022 à 13:34
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `movieapp`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(64, 'DRAMA'),
(63, 'HISTORICAL'),
(60, 'COMEDY'),
(58, 'MUSICAL'),
(65, 'ACTION'),
(66, 'ADVENTURE');

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(84);

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `id` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `is_adult` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ogko73h53na6cby69s2l8747a` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `duration`, `is_adult`, `name`, `year`) VALUES
(83, 90, 'No', 'Superman', 1987),
(82, 120, 'No', 'La vérité si je ments', 2003),
(81, 120, 'No', 'Le monde perdu', 2000),
(80, 90, 'No', 'Le diner de cons', 2000),
(79, 90, 'No', 'Les 7 mercenaires', 1965),
(78, 125, 'No', 'Fight Club', 1993),
(71, 120, 'No', 'Les dents de la mer', 1874),
(70, 120, 'No', 'La colline a des yeux ', 1875),
(68, 125, 'No', 'Titanic', 2000),
(77, 120, 'No', 'Jurassic Park', 1998);

-- --------------------------------------------------------

--
-- Structure de la table `movie_category`
--

DROP TABLE IF EXISTS `movie_category`;
CREATE TABLE IF NOT EXISTS `movie_category` (
  `movie_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`movie_id`,`category_id`),
  KEY `FKhkem46gi7yq1019e1j8hlvp9y` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `movie_category`
--

INSERT INTO `movie_category` (`movie_id`, `category_id`) VALUES
(68, 63),
(68, 66),
(70, 66),
(71, 65),
(77, 65),
(77, 66),
(78, 64),
(78, 65),
(79, 65),
(79, 66),
(80, 60),
(81, 66),
(82, 60),
(83, 66);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`) VALUES
(21, 'popoltruhuh@gmail.com', '$2a$10$zvdrXGPhhKJTyx1UVa89XOJ3HpSFTgVX8PhVgcitFqSkW06konmSK', 'user'),
(20, 'admin@admin', '$2a$10$tGG3k9CxxPWKL3vlMjIERuBORT6sKILNyUPKNbLOwYsuyOXdA.fvC', 'admin'),
(22, 'hugo.arcal@gmail.com', '$2a$10$QGdKAXiqWnS9gQbRBETag.XXdyunROIf8rGst4yhQ2WRmdRT8FNuC', 'user'),
(23, 'vdv@vdfvd', '$2a$10$n0n.ZqoNP9Zbel0/9UNdSORac/.QCzxI/V/7Ke5zWh12PhZuUWj4y', 'user'),
(24, 'hugrgd@ger', '$2a$10$1v1zf7ZecbLglrZEa4SnTej/WagCPmyh2vLUZa8HTW6gH3WHRifyG', 'user'),
(25, 'hugo.azdzed@fef', '$2a$10$J6LnyZjB5NJFRg/DvG0GAudgKQUXIU6FSAYl4vxqhw/KwR.1HSZSC', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
