CREATE DATABASE ddsfiles;

CREATE TABLE  client_req(
    file_id SERIAL PRIMARY KEY,
    url text,
    parts INTEGER
);

CREATE TABLE fileinfo(
    name text,
    ext text,
    status text,
    createOn TIMESTAMP,
    partCount INTEGER,
    parts INTEGER,
    reason text
);