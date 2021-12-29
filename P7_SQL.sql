CREATE DATABASE P7;

SHOW DATABASES;

USE P7;

CREATE TABLE Users (
id_users INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
pseudo VARCHAR(45) NOT NULL UNIQUE,
email VARCHAR(45) NOT NULL UNIQUE,
pass VARCHAR(1000) NOT NULL
);

SHOW COLUMNS FROM Users;
SHOW tables;

-- INSERT INTO `users` (`pseudo`, `email`, `pass`)
-- VALUES ('Jean', 'jean@gmail.com', 'neymar');
-- INSERT INTO `users` (`pseudo`, `email`, `pass`)
-- VALUES ('Paul', 'paul@gmail.com', 'belmondo');
-- INSERT INTO `users` (`pseudo`, `email`, `pass`)
-- VALUES ('Yakov', 'yakov@gmail.com', 'smirnoff');

-- INSERT INTO `users` (`pseudo`, `email`, `pass`)
-- VALUES ('admin', 'admin@admin', 'admin');

SELECT * FROM Users;

CREATE TABLE Posts (
id_posts INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_users INTEGER NOT NULL,
img VARCHAR(100),
title VARCHAR(100),
description VARCHAR(1000),
CONSTRAINT FOREIGN KEY (id_users) REFERENCES Users(id_users)
);

SHOW COLUMNS FROM Posts;
SHOW tables;

-- INSERT INTO `Posts` (`id_users`,`img`, `title`, `description`)
-- VALUES ( 1, 'jambe_cassee.jpg','Mon dernier match au brésil',
--         'Je suis me suis cassé la jambe :(');
-- INSERT INTO `Posts` (`id_users`,`img`, `title`, `description`)
-- VALUES ( 1, 'smiley.jpg', 'LOL', 'Cest une blague tous vas bien XD');

SELECT * FROM posts;

CREATE TABLE Remarks (
id_remarks INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_users INTEGER NOT NULL,
id_posts INTEGER NOT NULL,
remark VARCHAR(200) NULL,
CONSTRAINT FOREIGN KEY (id_users) REFERENCES Users(id_users),
CONSTRAINT FOREIGN KEY (id_posts) REFERENCES Posts(id_posts)
);

SHOW COLUMNS FROM remarks;
SHOW tables;

-- INSERT INTO `Remarks` (`id_users`,`id_posts`, `remark`)
-- VALUES ( 2, 1,'Oh non ! jai parié sur toi pour les matchs à venir !');
-- INSERT INTO `Remarks` (`id_users`,`id_posts`, `remark`)
-- VALUES ( 2, 2,'Cest une mauvaise blague jai eu peur pour mon argent !');

ALTER TABLE Remarks ADD CONSTRAINT id_posts_cascade FOREIGN KEY (id_posts) REFERENCES Posts(id_posts) ON DELETE CASCADE;

ALTER TABLE Posts ADD CONSTRAINT id_users_cascade FOREIGN KEY (id_users) REFERENCES Users(id_users) ON DELETE CASCADE;

SELECT * FROM remarks;