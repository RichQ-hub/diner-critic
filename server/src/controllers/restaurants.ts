import { Request, Response } from 'express';
import db from '../db';

export async function getRestaurants(req: Request, res: Response) {
    try {
        const allRestaurants = await db.query(`
            SELECT *
            FROM Restaurants;
        `);

        res.json({
            restaurants: allRestaurants
        });
    } catch (error) {
        res.status(500).send({ 
            message: error 
        });
    }
}

export async function getOneRestaurant(req: Request, res: Response) {

}

export async function createRestaurant(req: Request, res: Response) {

}

export async function editRestaurant(req: Request, res: Response) {

}

export async function deleteRestaurant(req: Request, res: Response) {
    
}