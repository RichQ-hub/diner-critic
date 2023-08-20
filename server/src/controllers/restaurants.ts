import { Request, Response } from 'express';
import db from '../db';

/**
 * Returns a list of all the restaurants.
 */
export async function getRestaurants(req: Request, res: Response) {
    try {
        // We invoke our user-defined view RestoDetails (see in views.sql).
        const allRestaurants = await db.query(`
            SELECT * FROM RestoDetails;
        `);

        res.json({
            restaurants: allRestaurants.rows
        });
    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

/**
 * Obtains all the information about a single restaurant by the given id from the req params.
 */
export async function getRestaurantDetails(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        const restaurant = await db.query(`
            SELECT * 
            FROM Restaurants
            WHERE id = $1;
        `, [restaurantId]);

        if (restaurant.rows.length === 0) {
            return res
            .status(404)
            .send({ message: 'Restaurant does not exist.' });
        }

        res.json({
            restaurant: restaurant.rows[0],
        });
    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

export async function getRestaurantReviews(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;
        
        // Note: We could make a user-defined stored procedure (sql function) instead of this or PLpgSQL.
        const allReviews = await db.query(`
            SELECT  res.id as restaurantID, rev.id as revID, rev.title as revTitle, rev.rating_overall
            FROM    Restaurants res
                    JOIN Reviews rev on res.id = rev.restaurant
            WHERE   res.id = $1;
        `, [restaurantId]);

        res.json({
            reviews: allReviews.rows
        });

    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

export async function createReview(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        const {
            title,
            content,
            rating_overall, 
            rating_food, 
            rating_service, 
            rating_atmosphere
        } = req.body;

        const results = await db.query(`
            INSERT INTO Reviews (restaurant, title, content, rating_overall, rating_food, rating_service, rating_atmosphere)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [restaurantId, title, content, rating_overall, rating_food, rating_service, rating_atmosphere]);

        const newReview = results.rows[0];
        res.json({
            review: newReview,
        });

    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

export async function searchRestaurants(req: Request, res: Response) {
    try {
        const { query } = req.query;

        // Pattern matches all restaurants that start with the search query in their name,
        // using case-insensitive matching. (COULD MAYBE LATER PATTERN MATCH ANYWHERE ON THE STRING
        // NOT JUST THE START).
        const nameRegexp = `^${query}.*`
        
        const matchedRestaurants = await db.query(`
            SELECT *
            FROM Restaurants
            WHERE name ~* $1;
        `, [nameRegexp]);

        res.json({
            restaurants: matchedRestaurants.rows,
        });
        
    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

/**
 * Creates a single new restaurant.
 * 
 * POSTMAN NOTE: For us to be able to send a image file along with the JSON body, we have to 
 * use the form-data option under the Body section when sending data to create a restaurant.
 * See how it's done on postman.
 */
export async function createRestaurant(req: Request, res: Response) {
    try {
        const {
            name,
            location,
            price_range,
            description_short,
            description_long,
        } = req.body;

        // Multer middleware automatically gives us access to the file property in the req object.
        // It contains all the info about the uploaded file.
        const fileLocation = req.file?.filename || "";

        // If there was no file uploaded, then we send back an error. (FOR NOW WE CAN UPLOAD NO FILES)
        // if (!req.file?.filename) {
        //     return res
        //     .status(404)
        //     .send({ message: 'No image uploaded' });
        // }

        const result = await db.query(`
            INSERT INTO Restaurants (name, location, price_range, description_short, description_long, img_filename)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation]);

        // Return the details of the newly created restaurant.
        const newRestaurant = result.rows[0];
        res.json({
            restaurant: newRestaurant,
        });
    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

/**
 * Updates the details of a single restaurant.
 * 
 * POSTMAN NOTE: For us to be able to send a image file along with the JSON body, we have to 
 * use the form-data option under the Body section when sending data to create a restaurant.
 * See how it's done on postman.
 */
export async function editRestaurant(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        // We pass in the restaurant attirbutes we want to change as part
        // of the request.
        const {
            name,
            location,
            price_range,
            description_short,
            description_long
        } = req.body;

        const fileLocation = req.file?.filename || "";

        // If there was no file uploaded, then we send back an error. (FOR NOW WE CAN UPLOAD NO FILES)
        // if (!req.file?.filename) {
        //     return res
        //     .status(404)
        //     .send({ message: 'No image uploaded' });
        // }

        const result = await db.query(`
            UPDATE Restaurants
            SET name = $1,
                location = $2,
                price_range = $3,
                description_short = $4,
                description_long = $5,
                img_filename = $6
            WHERE id = $7
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation, restaurantId]);

        if (result.rows.length === 0) {
            return res
            .status(404)
            .send({ message: 'Invalid Restaurant ID.' });
        }

        const updatedRestaurant = result.rows[0];

        res.json({
            restaurant: updatedRestaurant
        });

    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

/**
 * Deletes a single restaurant.
 */
export async function deleteRestaurant(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        const result = await db.query(`
            DELETE FROM Restaurants
            WHERE id = $1
            RETURNING *;
        `, [restaurantId]);

        if (result.rows.length === 0) {
            return res
            .status(404)
            .send({ message: 'Invalid Restaurant ID.' });
        }

        const deletedRestaurant = result.rows[0];

        res.json({
            restaurant: deletedRestaurant
        });

    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}