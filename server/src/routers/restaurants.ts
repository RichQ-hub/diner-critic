import express from 'express';
import upload from '../middleware/multerStorage';

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
router.post('/', upload.single("image"), createRestaurant);
router.put('/:restaurantId', upload.single("image"), editRestaurant);
router.delete('/:restaurantId', deleteRestaurant);

export default router;