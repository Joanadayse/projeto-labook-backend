-- Active: 1685378575510@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users(id,name,email, password, role) VALUES
("c90","joana", "joana@email.com", "12345", "NORMAL"),
("c91","joão", "joão@email.com", "12345", "NORMAL"),
("c92","maria", "maria@email.com", "12345", "NORMAL"),
("c93","roberta", "roberta@email.com", "12345", "ADM");

CREATE TABLE post(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL ,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at  TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO post(id, creator_id, content, likes, dislikes) VALUES
("b90", "c90", "Hoje é um bom dia", 2,0),
("b91", "c91", "Hoje é domingo", 10,1),
("b93", "c92", "bom dia", 20,1);

DROP TABLE post;

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(id) ON UPDATE CASCADE 
      ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE likes_dislikes;


