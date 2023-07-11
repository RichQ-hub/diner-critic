import express from 'express';

// Controllers.
import { 
    getRestaurants,
    getOneRestaurant,
    createRestaurant,
    editRestaurant,
    deleteRestaurant
} from '../controllers/restaurants';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:restaurantId', getOneRestaurant);
router.post('/', createRestaurant);
router.put('/:restaurantId', editRestaurant);
router.delete('/:restaurantId', deleteRestaurant)

export default router;