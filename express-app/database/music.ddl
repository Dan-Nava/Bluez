DROP TABLE IF EXISTS music;
CREATE TABLE music
(
    name            VARCHAR(255) PRIMARY KEY NOT NULL,
    info            VARCHAR,
    timestamps      VARCHAR,
    lyrics          VARCHAR,
    chords          VARCHAR,
    song_file       VARCHAR(255),
    video_file      VARCHAR(255),
    album_art       VARCHAR
);
