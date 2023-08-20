import express from 'express';
import upload from '../middleware/multerStorage';

// Controllers.
import { 
    getRestaurants,
    getRestaurantDetails,
    getRestaurantReviews,
    createReview,
    createRestaurant,
    editRestaurant,
    deleteRestaurant,
    searchRestaurants
} from '../controllers/restaurants';

const router = express.Router();

router.get('/', getRestaurants);
// We sepecify this get route above '/:restaurantId', so that if we were to access the route '/restaurants/search' 
// we don't set the value of the route param ':restaurantId' to 'search', which is invalid since there
// are no restaurants with an id of 'search'. So essentially, we pattern match this route '/search' first.
router.get('/search', searchRestaurants);
router.get('/:restaurantId', getRestaurantDetails);
router.post('/', upload.single("image"), createRestaurant);
router.put('/:restaurantId', upload.single("image"), editRestaurant);
router.delete('/:restaurantId', deleteRestaurant);

router.get('/:restaurantId/reviews', getRestaurantReviews);
router.post('/:restaurantId/reviews', createReview);

export default router;