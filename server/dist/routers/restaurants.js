"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerStorage_1 = __importDefault(require("../middleware/multerStorage"));
// Controllers.
const restaurants_1 = require("../controllers/restaurants");
const router = express_1.default.Router();
router.get('/', restaurants_1.getRestaurants);
// We sepecify this get route above '/:restaurantId', so that if we were to access the route '/restaurants/search' 
// we don't set the value of the route param ':restaurantId' to 'search', which is invalid since there
// are no restaurants with an id of 'search'. So essentially, we pattern match this route '/search' first.
router.get('/search', restaurants_1.searchRestaurants);
router.get('/:restaurantId', restaurants_1.getRestaurantDetails);
router.post('/', multerStorage_1.default.single("image"), restaurants_1.createRestaurant);
router.put('/:restaurantId', multerStorage_1.default.single("image"), restaurants_1.editRestaurant);
router.delete('/:restaurantId', restaurants_1.deleteRestaurant);
router.get('/:restaurantId/reviews', restaurants_1.getRestaurantReviews);
router.post('/:restaurantId/reviews', restaurants_1.createReview);
router.delete('/:restaurantId/reviews/:reviewId', restaurants_1.deleteReview);
exports.default = router;
