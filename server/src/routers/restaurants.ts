import express, { Request, Response } from 'express';

// Features.
import { 
    restaurants_list, 
    restaurants_create,
    restaurants_edit,
    restaurants_delete
} from '../features/restaurants';

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {   
        const result = await restaurants_list();

        res.json({
            status: 'success',
            data: {
                restaurants: result.restaurants,
            }
        })
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const location = req.body.restaurant;
        const price_range = req.body.price_range;

        const result = await restaurants_create(name, location, price_range);
        res.json({
            status: 'success',
            data: result,
        })
    } catch (error) {
        console.log(error);
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const location = req.body.location;
        const price_range = req.body.price_range;

        res.json({
            status: "success",
            data: await restaurants_edit(restaurant_id, name, location, price_range)
        });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const restaurant_id = req.body.restaurant_id;

        res.json({
            status: "success",
            data: await restaurants_delete(restaurant_id)
        })
    } catch (error) {
        console.log(error);
    }
})

export default router