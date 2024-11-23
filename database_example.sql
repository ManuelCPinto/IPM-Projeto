-- Insert genres
INSERT INTO genres (id, name) VALUES
                                  (1, 'Southern Hip Hop'),
                                  (2, 'Experimental Hip Hop'),
                                  (3, 'Trap'),
                                  (4, 'Cloud Rap'),
                                  (5, 'Alternative R&B'),
                                  (6, 'Pop Rap'),
                                  (7, 'Neo-Psychedelia'),
                                  (8, 'Gothic Rock'),
                                  (9, 'Post-Punk'),
                                  (10, 'West Coast Hip Hop'),
                                  (11, 'Neo-Soul'),
                                  (12, 'Slacker Rock'),
                                  (13, 'Avant-Folk'),
                                  (14, 'Post-Rock'),
                                  (15, 'Noise Rock'),
                                  (16, 'Sludge Metal');

-- Insert descriptors
INSERT INTO descriptors (id, name) VALUES
                                       (1, 'psychedelic'),
                                       (2, 'dark'),
                                       (3, 'nocturnal'),
                                       (4, 'progressive'),
                                       (5, 'male vocalist'),
                                       (6, 'drugs'),
                                       (7, 'hedonistic'),
                                       (8, 'atmospheric'),
                                       (9, 'eclectic'),
                                       (10, 'sexual'),
                                       (11, 'sampling'),
                                       (12, 'boastful'),
                                       (13, 'surreal'),
                                       (14, 'rhythmic'),
                                       (15, 'alcohol'),
                                       (16, 'vulgar'),
                                       (17, 'futuristic'),
                                       (18, 'party'),
                                       (19, 'urban'),
                                       (20, 'melodic'),
                                       (21, 'melancholic'),
                                       (22, 'introspective'),
                                       (23, 'groovy'),
                                       (24, 'catchy'),
                                       (25, 'energetic'),
                                       (26, 'playful'),
                                       (27, 'moody'),
                                       (28, 'dreamy'),
                                       (29, 'reflective'),
                                       (30, 'heavy'),
                                       (31, 'intense'),
                                       (32, 'chaotic'),
                                       (33, 'raw');

-- Insert albums
INSERT INTO albums (name, artist, type, release_date, recorded, rating, rated, ranked, cover, language) VALUES
                                                                                                            ('Utopia', 'travisscott', 'album', '28 July 2023', '2019 - 2023', 3.44, 20229, '#253 for 2023', '/covers/utopia.webp', 'English'),
                                                                                                            ('Disintegration', 'thecure', 'album', 'May 2, 1989', '1988–1989', 4.5, 50000, 'Ranked #543', '/covers/cure.webp', 'English'),
                                                                                                            ('Chromakopia', 'tyler', 'album', '28 October 2024', '', 3.67, 19545, '', '/covers/tyler.webp', 'English'),
                                                                                                            ('Night Palace', 'mounteerie', 'album', '1 November 2024', '', 3.99, 6094, '', '/covers/mountEerie.webp', 'English'),
                                                                                                            ('Cool World', 'chatpile', 'album', '11 October 2024', '', 3.82, 6330, '', '/covers/coolworld.jpg', 'English');

INSERT INTO albums (name, artist, type, release_date, recorded, rating, rated, ranked, cover, language) VALUES
    ('DAMN.', 'kendricklamar', 'album', 'April 14, 2017', '2016', 4.25, 120000, 'Ranked #150', '/covers/damn.jpg', 'English'),
    ('Blonde', 'frankocean', 'album', 'August 20, 2016', '2013-2016', 4.62, 250000, 'Ranked #20', '/covers/blonde.jpg', 'English'),
    ('Currents', 'tameimpala', 'album', 'July 17, 2015', '2014-2015', 4.15, 190000, 'Ranked #110', '/covers/currents.jpg', 'English'),
    ('In Rainbows', 'radiohead', 'album', 'October 10, 2007', '2005-2007', 4.50, 300000, 'Ranked #15', '/covers/inrainbows.png', 'English'),
    ('Channel Orange', 'frankocean', 'album', 'July 10, 2012', '2011-2012', 4.35, 230000, 'Ranked #40', '/covers/channelorange.jpg', 'English');

-- Insert users (artists)
INSERT INTO users (username, name, email, password, type, picture, followers, monthlyListeners, following) VALUES
                                                              ('admin', 'MusicBox', 'admin@example.com', 'admin123', 'user', '/covers/utopia.webp', 0,0, 0),
                                                              ('travisscott', 'Travis Scott', 'contact@travisscott.com','123123123', 'artist', '/covers/utopia.webp', 0, 0, 0),
                                                              ('thecure', 'The Cure', 'contact@thecure.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('tyler', 'Tyler, the Creator', 'contact@tyler.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('mounteerie', 'Mount Eerie', 'contact@mounteerie.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('chatpile', 'Chat Pile', 'contact@chatpile.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0);

INSERT INTO users (username, name, email, password, type, picture, followers, monthlyListeners, following) VALUES
                                                              ('andre', 'Andre Branco', 'andre@example.com', '123123123', 'user', '/covers/andre.jpg', 0,0, 0),
                                                              ('manuel', 'Manuel Pinto', 'manuel@example.com', '123123123', 'user', '/covers/manuel.jpg', 0,0, 0),
                                                              ('filipe', 'Filipe Carvalho', 'filipe@example.com', '123123123', 'user', '/covers/filipe.png', 0,0, 0),
                                                              ('joao', 'João Silveira', 'joao@example.com', '123123123', 'user', '/covers/joao.jpeg', 0,0, 0);

INSERT INTO users (username, name, email, password, type, picture, followers, monthlyListeners, following) VALUES
    ('kendricklamar', 'Kendrick Lamar', 'contact@kendricklamar.com', '123123123', 'artist', '/covers/damn.jpg', 0, 0, 0),
    ('frankocean', 'Frank Ocean', 'contact@frankocean.com', '123123123', 'artist', '/covers/blonde.jpg', 0, 0, 0),
    ('tameimpala', 'Tame Impala', 'contact@tameimpala.com', '123123123', 'artist', '/covers/currents.jpg', 0, 0, 0),
    ('radiohead', 'Radiohead', 'contact@radiohead.com', '123123123', 'artist', '/covers/inrainbows.png', 0, 0, 0);

-- Insert songs for 'Utopia' (album_id:1)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
                                                                                (1, 'travisscott', 1, 'Hyaena', '3:42', NULL),
                                                                                (1, 'travisscott', 2, 'Thank God', '3:05', NULL),
                                                                                (1, 'travisscott', 3, 'Modern Jam', '4:15', 'Teezo Touchdown'),
                                                                                (1, 'travisscott', 4, 'My Eyes', '4:11', NULL),
                                                                                (1, 'travisscott', 5, 'Gods Country', '2:08', NULL),
                                                                                (1, 'travisscott', 6, 'Sirens', '3:24', NULL),
                                                                                (1, 'travisscott', 7, 'Meltdown', '4:06', 'Drake'),
                                                                                (1, 'travisscott', 8, 'FE!N', '3:12', 'Playboi Carti'),
                                                                                (1, 'travisscott', 9, 'Delresto (Echoes)', '4:34', 'Beyoncé'),
                                                                                (1, 'travisscott', 10, 'I Know ?', '3:32', NULL),
                                                                                (1, 'travisscott', 11, 'Topia Twins', '3:43', 'Rob49 & 21 Savage'),
                                                                                (1, 'travisscott', 12, 'Circus Maximus', '4:19', 'Swae Lee & The Weeknd'),
                                                                                (1, 'travisscott', 13, 'Parasail', '3:01', 'Yung Lean'),
                                                                                (1, 'travisscott', 14, 'Skitzo', '4:15', 'Young Thug'),
                                                                                (1, 'travisscott', 15, 'Lost Forever', '4:03', 'Westside Gunn & James Blake'),
                                                                                (1, 'travisscott', 16, 'Looove', '3:58', 'Kid Cudi'),
                                                                                (1, 'travisscott', 17, 'K-Pop', '3:07', 'Bad Bunny & The Weeknd'),
                                                                                (1, 'travisscott', 18, 'Telekinesis', '5:04', 'Future & SZA'),
                                                                                (1, 'travisscott', 19, 'Til Further Notice', '3:32', '21 Savage & James Blake');

-- Insert songs for 'Disintegration' (album_id:2)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
                                                                                (2, 'thecure', 1, 'Plainsong', '5:16', NULL),
                                                                                (2, 'thecure', 2, 'Pictures of You', '7:28', NULL),
                                                                                (2, 'thecure', 3, 'Closedown', '4:16', NULL),
                                                                                (2, 'thecure', 4, 'Lovesong', '3:28', NULL),
                                                                                (2, 'thecure', 5, 'Last Dance', '4:47', NULL),
                                                                                (2, 'thecure', 6, 'Lullaby', '4:08', NULL),
                                                                                (2, 'thecure', 7, 'Fascination Street', '5:16', NULL),
                                                                                (2, 'thecure', 8, 'Prayers for Rain', '6:05', NULL),
                                                                                (2, 'thecure', 9, 'The Same Deep Water as You', '9:19', NULL),
                                                                                (2, 'thecure', 10, 'Disintegration', '8:18', NULL),
                                                                                (2, 'thecure', 11, 'Homesick', '7:06', NULL),
                                                                                (2, 'thecure', 12, 'Untitled', '6:30', NULL);

-- Insert songs for 'Chromakopia' (album_id:3)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
                                                                                (3, 'tyler', 1, 'Chromatic Intro', '1:42', NULL),
                                                                                (3, 'tyler', 2, 'Dreamscape', '4:08', NULL),
                                                                                (3, 'tyler', 3, 'Modern Jam', '3:45', 'Teezo Touchdown'),
                                                                                (3, 'tyler', 4, 'Soulful Vibes', '4:50', 'Kali Uchis'),
                                                                                (3, 'tyler', 5, 'West Coast Bounce', '3:30', NULL),
                                                                                (3, 'tyler', 6, 'Sunset Groove', '3:12', NULL),
                                                                                (3, 'tyler', 7, 'Chromakopia', '5:06', NULL),
                                                                                (3, 'tyler', 8, 'Nightfall Serenade', '4:35', 'Jorja Smith'),
                                                                                (3, 'tyler', 9, 'Finale', '6:18', NULL);

-- Insert songs for 'Night Palace' (album_id:4)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
                                                                                (4, 'mounteerie', 1, 'Silent Waters', '3:42', NULL),
                                                                                (4, 'mounteerie', 2, 'Through the Fog', '4:20', NULL),
                                                                                (4, 'mounteerie', 3, 'Midnight Bloom', '5:10', 'Phil Elverum'),
                                                                                (4, 'mounteerie', 4, 'Moonlit Shoreline', '4:45', NULL),
                                                                                (4, 'mounteerie', 5, 'Whispers', '3:15', NULL),
                                                                                (4, 'mounteerie', 6, 'Palace of Reflections', '5:40', NULL),
                                                                                (4, 'mounteerie', 7, 'The Last Light', '6:20', NULL),
                                                                                (4, 'mounteerie', 8, 'Ethereal Dream', '4:05', NULL),
                                                                                (4, 'mounteerie', 9, 'Nightfall Sonata', '5:30', NULL);

-- Insert songs for 'Cool World' (album_id:5)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
                                                                                (5, 'chatpile', 1, 'Into the Chaos', '3:45', NULL),
                                                                                (5, 'chatpile', 2, 'World on Fire', '4:12', NULL),
                                                                                (5, 'chatpile', 3, 'Heavy Skies', '5:20', 'Denzel Curry'),
                                                                                (5, 'chatpile', 4, 'Sludge Factory', '4:18', NULL),
                                                                                (5, 'chatpile', 5, 'Noise Anthem', '5:10', NULL),
                                                                                (5, 'chatpile', 6, 'Chaotic Symphony', '4:50', NULL),
                                                                                (5, 'chatpile', 7, 'Raw Edges', '3:58', NULL),
                                                                                (5, 'chatpile', 8, 'Endless Distortion', '6:22', 'James Blake'),
                                                                                (5, 'chatpile', 9, 'Cool World', '5:05', NULL),
                                                                                (5, 'chatpile', 10, 'Final Chapter', '6:30', NULL);

-- Insert songs for 'DAMN.' (album_id:6)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
    (6, 'kendricklamar', 1, 'BLOOD.', '1:58', NULL),
    (6, 'kendricklamar', 2, 'DNA.', '3:06', NULL),
    (6, 'kendricklamar', 3, 'YAH.', '2:40', NULL),
    (6, 'kendricklamar', 4, 'ELEMENT.', '3:28', NULL),
    (6, 'kendricklamar', 5, 'FEEL.', '3:34', NULL),
    (6, 'kendricklamar', 6, 'LOYALTY.', '3:47', 'Rihanna'),
    (6, 'kendricklamar', 7, 'PRIDE.', '4:35', NULL),
    (6, 'kendricklamar', 8, 'HUMBLE.', '2:57', NULL),
    (6, 'kendricklamar', 9, 'LUST.', '5:08', NULL),
    (6, 'kendricklamar', 10, 'LOVE.', '3:33', 'Zacari'),
    (6, 'kendricklamar', 11, 'XXX.', '4:14', 'U2'),
    (6, 'kendricklamar', 12, 'FEAR.', '7:41', NULL),
    (6, 'kendricklamar', 13, 'GOD.', '4:08', NULL),
    (6, 'kendricklamar', 14, 'DUCKWORTH.', '4:08', NULL);

-- Insert songs for 'Blonde' (album_id:7)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
    (7, 'frankocean', 1, 'Nikes', '5:14', NULL),
    (7, 'frankocean', 2, 'Ivy', '4:09', NULL),
    (7, 'frankocean', 3, 'Pink + White', '3:05', 'Beyoncé'),
    (7, 'frankocean', 4, 'Be Yourself', '1:26', NULL),
    (7, 'frankocean', 5, 'Solo', '4:17', NULL),
    (7, 'frankocean', 6, 'Skyline To', '3:04', 'Kendrick Lamar'),
    (7, 'frankocean', 7, 'Self Control', '4:09', NULL),
    (7, 'frankocean', 8, 'Good Guy', '1:06', NULL),
    (7, 'frankocean', 9, 'Nights', '5:07', NULL),
    (7, 'frankocean', 10, 'Solo (Reprise)', '1:18', 'André 3000'),
    (7, 'frankocean', 11, 'Pretty Sweet', '2:38', NULL),
    (7, 'frankocean', 12, 'Facebook Story', '1:09', NULL),
    (7, 'frankocean', 13, 'Close to You', '1:26', NULL),
    (7, 'frankocean', 14, 'White Ferrari', '4:08', NULL),
    (7, 'frankocean', 15, 'Seigfried', '5:34', NULL),
    (7, 'frankocean', 16, 'Godspeed', '2:57', 'Kim Burrell'),
    (7, 'frankocean', 17, 'Futura Free', '9:24', NULL);

-- Insert songs for 'Currents' (album_id:8)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
    (8, 'tameimpala', 1, 'Let It Happen', '7:47', NULL),
    (8, 'tameimpala', 2, 'Nangs', '1:48', NULL),
    (8, 'tameimpala', 3, 'The Moment', '4:15', NULL),
    (8, 'tameimpala', 4, 'Yes I’m Changing', '4:30', NULL),
    (8, 'tameimpala', 5, 'Eventually', '5:19', NULL),
    (8, 'tameimpala', 6, 'Gossip', '0:55', NULL),
    (8, 'tameimpala', 7, 'The Less I Know the Better', '3:36', NULL),
    (8, 'tameimpala', 8, 'Past Life', '3:48', NULL),
    (8, 'tameimpala', 9, 'Disciples', '1:48', NULL),
    (8, 'tameimpala', 10, 'Cause I’m a Man', '4:01', NULL),
    (8, 'tameimpala', 11, 'Reality in Motion', '4:12', NULL),
    (8, 'tameimpala', 12, 'Love/Paranoia', '3:06', NULL),
    (8, 'tameimpala', 13, 'New Person, Same Old Mistakes', '6:03', NULL);

-- Insert songs for 'In Rainbows' (album_id:9)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
    (9, 'radiohead', 1, '15 Step', '3:57', NULL),
    (9, 'radiohead', 2, 'Bodysnatchers', '4:02', NULL),
    (9, 'radiohead', 3, 'Nude', '4:15', NULL),
    (9, 'radiohead', 4, 'Weird Fishes/Arpeggi', '5:18', NULL),
    (9, 'radiohead', 5, 'All I Need', '3:48', NULL),
    (9, 'radiohead', 6, 'Faust Arp', '2:10', NULL),
    (9, 'radiohead', 7, 'Reckoner', '4:50', NULL),
    (9, 'radiohead', 8, 'House of Cards', '5:28', NULL),
    (9, 'radiohead', 9, 'Jigsaw Falling Into Place', '4:09', NULL),
    (9, 'radiohead', 10, 'Videotape', '4:39', NULL);

-- Insert songs for 'Channel Orange' (album_id:10)
INSERT INTO songs (album_id, author, track_number, name, duration, feature) VALUES
    (10, 'frankocean', 1, 'Start', '0:46', NULL),
    (10, 'frankocean', 2, 'Thinkin Bout You', '3:20', NULL),
    (10, 'frankocean', 3, 'Fertilizer', '1:06', NULL),
    (10, 'frankocean', 4, 'Sierra Leone', '2:57', NULL),
    (10, 'frankocean', 5, 'Sweet Life', '4:17', NULL),
    (10, 'frankocean', 6, 'Not Just Money', '3:00', NULL),
    (10, 'frankocean', 7, 'Super Rich Kids', '5:02', 'Earl Sweatshirt'),
    (10, 'frankocean', 8, 'Pilot Jones', '4:14', NULL),
    (10, 'frankocean', 9, 'Crack Rock', '4:24', NULL),
    (10, 'frankocean', 10, 'Pyramids', '9:53', NULL),
    (10, 'frankocean', 11, 'Bad Religion', '2:49', NULL),
    (10, 'frankocean', 12, 'Pink Matter', '4:28', 'Andre 3000'),
    (10, 'frankocean', 13, 'Forrest Gump', '3:14', NULL),
    (10, 'frankocean', 14, 'End', '0:29', NULL);

-- Link genres to albums
-- Utopia (album_id:1)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (1, 1),
                                                      (1, 2),
                                                      (1, 3),
                                                      (1, 4),
                                                      (1, 5),
                                                      (1, 6),
                                                      (1, 7);

-- Disintegration (album_id:2)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (2, 8),
                                                      (2, 9);

-- Chromakopia (album_id:3)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (3, 10),
                                                      (3, 11);

-- Night Palace (album_id:4)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (4, 12),
                                                      (4, 13),
                                                      (4, 14);

-- Cool World (album_id:5)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (5, 15),
                                                      (5, 16);

-- DAMN. (album_id:6)      
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (6, 1),
                                                      (6, 3),
                                                      (6, 2),
                                                      (6, 4);

-- Blonde (album_id:7)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (7, 5),
                                                      (7, 2),
                                                      (7, 7);

-- Currents (album_id:8)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (8, 5),
                                                      (8, 12);

-- In Rainbows (album_id:9)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (9, 13),
                                                      (9, 15),
                                                      (9, 8);

-- Channel Orange (album_id:10)
INSERT INTO tbc_album_genres (album_id, genre_id) VALUES
                                                      (10, 9),
                                                      (10, 13),
                                                      (10, 16);

-- Spiral Abyss (album_id:6)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (6, 34),
                                                                (6, 35),
                                                                (6, 36),
                                                                (6, 37);

-- Forgotten Waves (album_id:7)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (7, 38),
                                                                (7, 39),
                                                                (7, 40),
                                                                (7, 41);

-- Ecliptica (album_id:8)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (8, 42),
                                                                (8, 43),
                                                                (8, 44),
                                                                (8, 45);

-- Celestial Mechanics (album_id:9)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (9, 46),
                                                                (9, 47),
                                                                (9, 48),
                                                                (9, 49),
                                                                (9, 50);

-- Solaris Soundtrack (album_id:10)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (10, 51),
                                                                (10, 52),
                                                                (10, 53),
                                                                (10, 54),
                                                                (10, 55);

-- Link descriptors to albums
-- Utopia (album_id:1)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (1, 1),
                                                                (1, 2),
                                                                (1, 3),
                                                                (1, 4),
                                                                (1, 5),
                                                                (1, 6),
                                                                (1, 7),
                                                                (1, 8),
                                                                (1, 9),
                                                                (1, 10),
                                                                (1, 11),
                                                                (1, 12),
                                                                (1, 13),
                                                                (1, 14),
                                                                (1, 15),
                                                                (1, 16),
                                                                (1, 17),
                                                                (1, 18),
                                                                (1, 19),
                                                                (1, 20);

-- Disintegration (album_id:2)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (2, 21),
                                                                (2, 8),
                                                                (2, 22);

-- Chromakopia (album_id:3)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (3, 23),
                                                                (3, 24),
                                                                (3, 25),
                                                                (3, 26);

-- Night Palace (album_id:4)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (4, 27),
                                                                (4, 28),
                                                                (4, 8),
                                                                (4, 29);

-- Cool World (album_id:5)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (5, 30),
                                                                (5, 31),
                                                                (5, 32),
                                                                (5, 33);

-- DAMN. (album_id:6)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (6, 12),
                                                                (6, 14),
                                                                (6, 31),
                                                                (6, 2);

-- Blonde (album_id:7)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (7, 4),
                                                                (7, 25),
                                                                (7, 6),
                                                                (7, 32);

-- Currents (album_id:8)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (8, 5),
                                                                (8, 19),
                                                                (8, 7),
                                                                (8, 11);

-- In Rainbows (album_id:9)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (9, 17),
                                                                (9, 27),
                                                                (9, 33),
                                                                (9, 15),
                                                                (9, 1);

-- Channel Orange (album_id:10)
INSERT INTO tbc_album_descriptors (album_id, descriptor_id) VALUES
                                                                (10, 14),
                                                                (10, 12),
                                                                (10, 30),
                                                                (10, 20),
                                                                (10, 10);

-- Insert reviews
-- Utopia (album_id:1)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (1, 'silveira', 'Aug 10, 2023', 4, 'This is an album that I didn’t enjoy when it was first released. I thought the beats were boring');

-- Disintegration (album_id:2)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (2, 'musicfan123', 'Mar 21, 2023', 5, 'Disintegration is one of the best albums of all time...');

-- (album_id:3)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (3, 'joao', 'Mar 22, 2023', 3.5, 'Its okay');

-- (album_id:4)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (4, 'pedro', 'Mar 23, 2023', 4, 'Banger');

INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (5, 'gabriel', 'Mar 24, 2023', 2.5, 'mid');

-- DAMN. (album_id:6)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (6, 'aesthetic_lord', 'Sep 15, 2023', 4.5, 'Spiral Abyss feels like stepping into an infinite loop of dreamy soundscapes, with every track unraveling layers of atmospheric beauty.');

-- Blonde (album_id:7)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (7, 'wave_chaser', 'Oct 2, 2023', 4.8, 'Forgotten Waves is a serene journey through aquatic soundscapes, blending soft synths and ethereal melodies seamlessly.');
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (7, 'nox_nova', 'Oct 3, 2023', 4.0, 'A bit slow in places, but the overall experience is mesmerizing.');

-- Currents (album_id:8)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (8, 'orbitfan', 'Aug 12, 2023', 3.5, 'Ecliptica is a strong effort with stellar high points, but it lacks the cohesiveness to truly shine.');
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (8, 'stellar_wanderer', 'Aug 14, 2023', 4.2, 'A hauntingly beautiful album that merges darkness with celestial wonder.');

-- In Rainbows (album_id:9)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (9, 'cosmic_seer', 'Nov 5, 2023', 5.0, 'Celestial Mechanics is a masterpiece—an interstellar voyage of sound and emotion. Every track feels like a portal to another universe.');
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (9, 'gravity_well', 'Nov 6, 2023', 4.7, 'Absolutely breathtaking in scope. The pacing could be better, but its a minor flaw in an otherwise stunning album.');

-- Channel Orange (album_id:10)
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (10, 'cinema_synth', 'Oct 25, 2023', 4.0, 'A perfect companion to the Solaris film. The soundtrack captures the melancholic beauty of the cosmos.');
INSERT INTO reviews (album_id, user, date, stars, content) VALUES
    (10, 'astro_aesthete', 'Oct 26, 2023', 4.5, 'Hypnotic and evocative. Listening to this feels like drifting through an endless void, filled with both wonder and isolation.');


INSERT INTO follows (follower, following)
VALUES
    ('Manuel', 'admin'),
    ('Manuel', 'travisscott'),
    ('Manuel', 'thecure'),
    ('Manuel', 'tyler'),
    ('Manuel', 'mounteerie'),
    ('Manuel', 'chatpile'),
    ('admin', 'Manuel'),
    ('travisscott', 'Manuel'),
    ('thecure', 'Manuel'),
    ('tyler', 'Manuel'),
    ('mounteerie', 'Manuel'),
    ('chatpile', 'Manuel');

INSERT INTO playlist (name, author, cover) VALUES 
  ('Summer Vibes', 'DJ Breezy', 'summer-vibes-cover.jpg');

INSERT INTO tbc_playlist_songs (playlist_id, song_id) VALUES 
  (1, 3),  
  (1, 7),  
  (1, 15), 
  (1, 22), 
  (1, 30); 


INSERT INTO playlist (name, author, cover) VALUES 
  ('Chill Nights', 'Moonlit Beats', 'chill-nights-cover.jpg');


INSERT INTO tbc_playlist_songs (playlist_id, song_id) VALUES 
  (2, 4),  
  (2, 9),  
  (2, 18), 
  (2, 24), 
  (2, 35); 

INSERT INTO playlist (name, author, cover) VALUES 
  ('Road Trip Classics', 'Vibes Collector', 'road-trip-cover.jpg');

INSERT INTO tbc_playlist_songs (playlist_id, song_id) VALUES 
  (3, 1),  
  (3, 12), 
  (3, 19), 
  (3, 25), 
  (3, 40); 

INSERT INTO playlist (name, author, cover) VALUES 
  ('Study Focus', 'Focused Mind', 'study-focus-cover.jpg');

INSERT INTO tbc_playlist_songs (playlist_id, song_id) VALUES 
  (4, 5),  
  (4, 14), 
  (4, 21), 
  (4, 28), 
  (4, 37); 

INSERT INTO playlist (name, author, cover) VALUES 
  ('Workout Power', 'Power Beats', 'workout-power-cover.jpg');

INSERT INTO tbc_playlist_songs (playlist_id, song_id) VALUES 
  (5, 6),  
  (5, 11), 
  (5, 16), 
  (5, 23), 
  (5, 33); 
