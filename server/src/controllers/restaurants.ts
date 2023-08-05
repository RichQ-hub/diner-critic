import { Request, Response } from 'express';
import db from '../db';

/**
 * Returns a list of all the restaurants.
 */
export async function getRestaurants(req: Request, res: Response) {
    try {
        const allRestaurants = await db.query(`
            SELECT *
            FROM Restaurants;
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
 * Obtains a single restaurant by the given id from the req params.
 */
export async function getOneRestaurant(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        const restaurant = await db.query(`
            SELECT * 
            FROM Restaurants
            WHERE id = $1;
        `, [restaurantId]);

        res.json({
            restaurant: restaurant.rows[0],
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
        const fileLocation = `storage/${req.file?.filename}`;

        // If there was no file uploaded, then we send back an error.
        if (!req.file?.filename) {
            return res
            .status(404)
            .send({ message: 'No image uploaded' });
        }

        console.log(fileLocation)

        const result = await db.query(`
            INSERT INTO Restaurants (name, location, price_range, description_short, description_long, img_href)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation]);

        console.log("nope")

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

        const fileLocation = `storage/${req.file?.filename}`;

        // If there was no file uploaded, then we send back an error.
        if (!req.file?.filename) {
            return res
            .status(404)
            .send({ message: 'No image uploaded' });
        }

        const result = await db.query(`
            UPDATE Restaurants
            SET name = $1,
                location = $2,
                price_range = $3,
                description_short = $4,
                description_long = $5,
                img_ref = $6
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