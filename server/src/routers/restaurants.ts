import express, { Request, Response } from 'express';

// Features.
import { restaurants_list, restaurants_create } from '../features/restaurants';

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
        alert(error);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const result = await restaurants_create(req.body.name, req.body.location, req.body.price_range);
        res.json({
            status: 'success',
            data: result,
        })
    } catch (error) {
        alert(error)
    }
});

export default router