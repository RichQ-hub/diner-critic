
-- Ensures email matches the specified regex pattern.
CREATE DOMAIN EmailString AS VARCHAR(64) CHECK (VALUE ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
CREATE DOMAIN GenderType AS CHAR(1) CHECK (VALUE IN ('M', 'F'));

CREATE TABLE Restaurants (
    id SERIAL,
    name VARCHAR(30) UNIQUE NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INTEGER NOT NULL
        CHECK (price_range BETWEEN 0 and 5),
    -- opened DATE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Users (
    id SERIAL,
    email EmailString UNIQUE NOT NULL,
    password VARCHAR(16) NOT NULL,
    name_first VARCHAR(64) NOT NULL,
    gender GenderType,
    birthday DATE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Reviews (
    id SERIAL,
    author INTEGER NOT NULL,
    restaurant INTEGER NOT NULL,
    content TEXT,
    rating INTEGER NOT NULL 
        CHECK (rating BETWEEN 0 AND 10),
    created_at DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES Users(id),
    FOREIGN KEY (restaurant) REFERENCES Restaurants(id)
);

-- DUMMY TABLE (FOR TESTING)
-- CREATE TABLE oks (
--     id SERIAL,
--     name VARCHAR(30),
--     PRIMARY KEY (id)
-- );

-- INSERT INTO oks (name) 
-- VALUES
--     ('mike'),
--     ('jacob'),
--     ('harry');