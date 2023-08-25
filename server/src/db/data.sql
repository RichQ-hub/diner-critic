-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/data.sql

INSERT INTO Restaurants (name, location, price_range, img_filename)
VALUES
    ('Burgers', 'Washington', 4, '1')
;

INSERT INTO Reviews (restaurant, title, content, rating_overall, rating_food, rating_service, rating_atmosphere)
VALUES
    (1, 'Not Bad', '', 3, 1, 2, 3),
    (1, 'lol', '', 4, 4, 4, 3),
    (1, 'k', '', 5, 1, 2, 1),
    (1, 'b', '', 5, 3, 3, 2)
;