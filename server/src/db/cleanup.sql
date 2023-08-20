--  Clean up tables
--  Note: The order of dropping tables is important due to referential integrity.

-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/cleanup.sql

DROP DOMAIN IF EXISTS
    EmailString,
    GenderType,
    Rating
CASCADE;

DROP TABLE  IF EXISTS 
    Reviews,
    Restaurants,
    Users
CASCADE;

DROP VIEW IF EXISTS RestoDetails;