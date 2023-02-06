DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    username        VARCHAR(255) PRIMARY KEY NOT NULL,
    password_hashed VARCHAR(255)             NOT NULL,
    account_id      VARCHAR(255)             NOT NULL,
    access_level    INTEGER                  NOT NULL
);
