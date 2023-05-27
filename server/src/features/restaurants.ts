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