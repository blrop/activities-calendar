SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE `activity_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `date` date NOT NULL,
  `content` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activity_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `password`, `registered_on`, `last_login_on`, `activities`) VALUES
(1,	'example',	'$2b$10$WYYV6w2stQME0JP2k.ww1.pYSsaUr/7hQqijPOGOZjdn2z7uH7AkO',	'2020-07-01 00:00:00',	'2020-07-01 00:00:00',	'[{\"title\": \"Listen to podcasts\", \"colorId\": \"10\"}, {\"title\": \"Perform some physical activity\", \"colorId\": \"13\"}, {\"title\": \"Read a book\", \"colorId\": \"9\"}]');


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `registered_on` datetime NOT NULL,
  `last_login_on` datetime NOT NULL,
  `activities` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;