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
-- Insert users (artists)
INSERT INTO users (username, name, email, password, type, picture, followers, monthlyListeners, following) VALUES
                                                              ('admin', 'MusicBox', 'admin@example.com', 'admin123', 'user', '/covers/utopia.webp', 0,0, 0),
                                                              ('travisscott', 'Travis Scott', 'contact@travisscott.com','123123123', 'artist', '/covers/utopia.webp', 0, 0, 0),
                                                              ('thecure', 'The Cure', 'contact@thecure.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('tyler', 'Tyler, the Creator', 'contact@tyler.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('mounteerie', 'Mount Eerie', 'contact@mounteerie.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0),
                                                              ('chatpile', 'Chat Pile', 'contact@chatpile.com', '123123123', 'artist', '/covers/utopia.webp',0 , 0,0);

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
