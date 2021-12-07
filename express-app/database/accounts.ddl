DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts
(
    account_id          VARCHAR(255) PRIMARY KEY NOT NULL,
    name                VARCHAR(255),
    title               VARCHAR(255),
    description         VARCHAR(255),
    favorites           VARCHAR,
    playlist            VARCHAR,
    friends             VARCHAR,
    avatar              VARCHAR,
    hero                VARCHAR
);
