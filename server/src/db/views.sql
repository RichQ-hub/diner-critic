-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/views.sql

CREATE OR REPLACE VIEW AllRestaurantCardDetails(rest_id, name, description_short, location, price_range, img_filename, num_reviews, avg_rating)
AS
    SELECT  res.id, 
            res.name, 
            res.description_short, 
            res.location, 
            res.price_range, 
            res.img_filename,
            count(rev.id), 
            trunc(coalesce(avg(rev.rating_overall), 0), 2)
    FROM    Restaurants res
            LEFT OUTER JOIN Reviews rev on res.id = rev.restaurant
    GROUP BY res.id, res.name, res.location, res.price_range, res.img_filename
;

CREATE TYPE RestaurantDetailsRecord AS (
    name VARCHAR(30),
    location VARCHAR(50),
    description_long TEXT,
    img_filename TEXT,
    num_reviews INTEGER,
    overall_rating_avg DECIMAL,
    food_rating_avg DECIMAL,
    service_rating_avg DECIMAL,
    atmosphere_rating_avg DECIMAL
);

CREATE OR REPLACE FUNCTION 
    RestaurantPageDetails(rest_id INTEGER) RETURNS SETOF RestaurantDetailsRecord
AS $$
BEGIN
    RETURN query
        SELECT  res.name, 
                res.location, 
                res.description_long, 
                res.img_filename, 
                count(rev.id)::INTEGER,
                trunc(coalesce(avg(rev.rating_overall), 0), 1),
                trunc(coalesce(avg(rev.rating_food), 0), 1),
                trunc(coalesce(avg(rev.rating_service), 0), 1),
                trunc(coalesce(avg(rev.rating_atmosphere), 0), 1)
        FROM    Restaurants res
                LEFT OUTER JOIN Reviews rev on rev.restaurant = res.id
        WHERE   res.id = rest_id
        GROUP BY res.name, res.location, res.description_long, res.img_filename;
END;
$$ LANGUAGE plpgsql;

-- NOTES:
-- We use (left outer join) since we want to display restuarants even if they have no
-- ratings that they can join with. Additionally, we use count(rev.id) since if 
-- we just did count(*) we would count the empty restaurant tuple with no 
-- reviews as having a count of 1, despite having no reviews which is not correct
-- as it should display 0 since it has no reviews. To ensure we don't have this case
-- we do count(rev.id), so that we count all the tuples that contain a non-null rev.id
-- attribute. If a restaurant did not join with any review tuples, then rev.id should
-- not exist, and thus count(rev.id) should be 0. 

-- NOTE: Trunc()
-- Simply truncates the float number returned by avg() to only 2 decimal places.

-- WHY WE USE COALESCE()
-- Since using avg() on no tuples returns "null". Instead we use coalesce so to guarantee we return 0
-- when there are no reviews for a restaurant. Coalesce returns the first non-null value in its args.