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
 */
export async function createRestaurant(req: Request, res: Response) {
    try {
        const {
            name,
            location,
            price_range
        } = req.body;

        const result = await db.query(`
            INSERT INTO Restaurants (name, location, price_range)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, location, price_range]);

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
 */
export async function editRestaurant(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;

        // We pass in the restaurant attirbutes we want to change as part
        // of the request.
        const {
            name,
            location,
            price_range
        } = req.body;

        const result = await db.query(`
            UPDATE Restaurants
            SET name = $1,
                location = $2,
                price_range = $3
            WHERE id = $4
            RETURNING *;
        `, [name, location, price_range, restaurantId]);

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