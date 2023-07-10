import db from '../db';

/**
 * Lists all the restaurants.
 */
export async function restaurants_list() {
    const result = await db.query(`
        SELECT * 
        FROM Restaurants
        ;
    `);

    return {
        restaurants: result.rows,
    }
}

/**
 * Creates a new restaurant.
 */
export async function restaurants_create(name: string, location: string, price_range: number) {
    const result = await db.query(`
        INSERT INTO Restaurants (name, location, price_range)
        VALUES ($1, $2, $3)
        RETURNING *
        ;
    `, [name, location, price_range]);

    const newRestaurant = result.rows[0];

    return {
        name: newRestaurant.name,
        location: newRestaurant.location,
        price_range: newRestaurant.price_range,
    }
}

/**
 * Updates an existing restaurant.
 */
export async function restaurants_edit(
    restaurant_id: number, 
    name: string, 
    location: string, 
    price_range: number
) {
    const result = await db.query(`
        UPDATE Restaurants
        SET name = $1,
            location = $2,
            price_range = $3
        WHERE id = $4
        RETURNING *;
    `, [name, location, price_range, restaurant_id]);

    // If the restaurant didn't exist, then we would've returned
    // nothing.

    return {
        
    }
}

/**
 * Deletes an existing restaurant.
 */
export async function restaurants_delete(restaurant_id: number) {
    await db.query(`
        DELETE FROM Restaurants
        WHERE id = $1
        ;
    `, [restaurant_id]);

    return {}
}