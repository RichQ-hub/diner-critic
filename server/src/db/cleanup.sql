--  Clean up tables
--  Note: The order of dropping tables is important due to referential integrity.

-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/cleanup.sql

DROP TABLE Reviews;
DROP TABLE Restaurants;
DROP TABLE Users;

DROP DOMAIN EmailString;
DROP DOMAIN GenderType;