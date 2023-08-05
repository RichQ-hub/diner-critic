-- Initialise database tables.
-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/schema.sql

-- Note: PostgreSQL Shell does this weird thing where the path uses '/' instead of 
-- the normal '\'.

--------------------------------------------------------------------------------------------------

-- Ensures email matches the specified regex pattern.
CREATE DOMAIN EmailString AS VARCHAR(64) CHECK (VALUE ~ '^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$');
CREATE DOMAIN GenderType AS CHAR(1) CHECK (VALUE IN ('M', 'F'));

CREATE TABLE Restaurants (
    id SERIAL,
    name VARCHAR(30) UNIQUE NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INTEGER NOT NULL
        CHECK (price_range BETWEEN 0 and 5),
    description_short VARCHAR(150), -- Short description displayed on the restaurant card in the finder.
    description_long TEXT, -- Description displayed on the review page.
    img_filename TEXT NOT NULL, -- Stores the main image local reference link.

    PRIMARY KEY (id)
);

CREATE TABLE Users (
    id SERIAL,
    email EmailString UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- We store the encrypted password.
    name_first VARCHAR(64) NOT NULL,
    gender GenderType,
    birth_date DATE NOT NULL, -- Stored as a string in the format 'yyyy-mm-dd'

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

-- MOCK DATA GENERATOR
--      https://www.mockaroo.com/
