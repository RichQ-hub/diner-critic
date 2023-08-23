-- Initialise database tables.
-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/schema.sql

-- Note: PostgreSQL Shell does this weird thing where the path uses '/' instead of 
-- the normal '\'.

--------------------------------------------------------------------------------------------------

-- Sets the timezone of this particular db.
SET timezone = 'Australia/NSW';

-- Ensures email matches the specified regex pattern.
CREATE DOMAIN EmailString AS VARCHAR(64) CHECK (VALUE ~ '^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$');
CREATE DOMAIN GenderType AS CHAR(1) CHECK (VALUE IN ('M', 'F'));
CREATE DOMAIN Rating AS INTEGER CHECK (VALUE >= 1 AND VALUE <= 5);

CREATE TABLE Restaurants (
    id SERIAL,
    name VARCHAR(30) UNIQUE NOT NULL
        CHECK (name <> ''), -- NOT NULL and the empty string '' are not equal, and so need to be tested separately.
    location VARCHAR(50) NOT NULL
        CHECK (name <> ''),
    price_range INTEGER NOT NULL
        CHECK (price_range BETWEEN 0 and 5),
    description_short VARCHAR(150), -- Short description displayed on the restaurant card in the finder.
    description_long TEXT, -- Description displayed on the review page.
    img_filename TEXT NOT NULL, -- Stores the main image local reference link.
    posted_at TIMESTAMPTZ DEFAULT NOW(),

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

-- NOTE: For now don't worry about the author since we haven't implemented authentication and authorisation.

CREATE TABLE Reviews (
    id SERIAL,
    -- author INTEGER NOT NULL,
    restaurant INTEGER NOT NULL,
    title VARCHAR(50),
    content TEXT,
    rating_overall Rating NOT NULL,
    rating_food Rating NOT NULL,
    rating_service Rating NOT NULL,
    rating_atmosphere Rating NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY (id),
    -- FOREIGN KEY (author) REFERENCES Users(id),
    FOREIGN KEY (restaurant) REFERENCES Restaurants(id)
);

-- MOCK DATA GENERATOR
--      https://www.mockaroo.com/
