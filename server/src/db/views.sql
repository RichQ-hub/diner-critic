-- Run via: \i {absolute_path_to_sql_file}
--      Sample: \i C:/Users/rrqui/OneDrive/Desktop/Projects/diner-critic/server/src/db/views.sql

CREATE OR REPLACE VIEW RestoDetails(rest_id, restaurant, location, price_range, num_reviews, avg_review)
AS
    SELECT  res.id, res.name, res.location, res.price_range, count(rev.id), trunc(avg(rev.rating_overall), 2)
    FROM    Restaurants res
            LEFT OUTER JOIN Reviews rev on res.id = rev.restaurant
    GROUP BY res.id, res.name, res.location, res.price_range
;

-- NOTES:
-- We use (left outer join) since we want to display restuarants even if they have no
-- ratings that they can join with. Additionally, we use count(rev.id) since if 
-- we just did count(*) we would count the empty restaurant tuple with no 
-- reviews as having a count of 1, despite having no reviews which is not correct
-- as it should display 0 since it has no reviews. To ensure we don't have this case
-- we do count(rev.id), so that we count all the tuples that contain a non-null rev.id
-- attribute. If a restaurant did not join with any review tuples, then rev.id should
-- not exist, and thus count(rev.id) should be 0. 