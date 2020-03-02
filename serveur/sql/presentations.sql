--
-- Base de données: tp2
--

CREATE DATABASE tp2 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `presentations`
--

DROP TABLE IF EXISTS `presentations`;
CREATE TABLE IF NOT EXISTS `presentations` (
  `id_presentation` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) DEFAULT NULL,
  `resume` varchar(400) DEFAULT NULL,
  `thematique` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `heure_debut` time DEFAULT NULL,
  `heure_fin` time DEFAULT NULL,
  `salle` varchar(100) DEFAULT NULL,
  `presentateur` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_presentation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `presentations` (`id_presentation`, `titre`, `resume`, `thematique`, `date`, `heure_debut`, `heure_fin`, `salle`, `presentateur`, `institution`) VALUES
(1, 'Présentation sur JavaScript', 'Une présentation sur les dernieres nouvelles de JavaScript', 'Thechnologie', '2020-02-15', '13:00:00', '02:00:00', 'A1', 'Karlene Anna', 'ETS'),
(2, 'Présentation sur PHP', 'Une présentation sur les dernieres nouvelles de PHP', 'Thechnologie', '2020-01-14', '08:00:00', '12:00:00', 'A1', 'Sarnai Sandrine', 'ETS'),
(3, 'Présentation sur HTML', 'Une présentation sur les dernieres nouvelles de HTML', 'Thechnologie', '2020-02-01', '13:00:00', '17:00:00', 'A2', 'Gonca Yeong-Hwan', 'Maisonneuve'),
(4, 'Présentation sur CSS', 'Une présentation sur les dernieres nouvelles de CSS', 'Thechnologie', '2021-03-05', '15:00:00', '16:00:00', 'B2', 'Maxim Paviel', 'Maisonneuve'),
(5, 'Présentation sur la biologie', 'Resumé de la presentation sur la biologie', 'Sciences', '2020-01-05', '11:00:00', '12:00:00', 'A1', ' Kalevi Anatole', 'McGill'),
(6, 'Présentation sur la médicine', 'Resumé de la presentation sur la médicine', 'Sciences', '2020-02-05', '12:00:00', '13:00:00', 'B2', 'Isabella Lara', 'McGill'),
(7, 'Présentation sur l\'astrologie', 'Resumé de la presentation  l\'astrologie', 'Sciences', '2020-03-05', '13:00:00', '14:00:00', 'B2', 'Erskine Aron', 'Concordia'),
(8, 'Présentation sur la chimie', 'Resumé de la presentation sur la chimie', 'Sciences', '2020-04-05', '14:00:00', '15:00:00', 'C1', 'Emory Hina', 'Concordia'),
(9, 'Présentation sur l\'art', 'Resumé de la presentation sur l\'art', 'Art', '2020-04-05', '14:00:00', '15:00:00', 'D1', 'Mungo Ninhursag', 'Concordia'),
(10, 'Présentation sur la photographie', 'Resumé de la presentation sur la photographie', 'Art', '2020-04-05', '14:00:00', '15:00:00', 'D2', 'Lana Stirling', 'Concordia');