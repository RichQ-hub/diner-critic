"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.editRestaurant = exports.createRestaurant = exports.searchRestaurants = exports.deleteReview = exports.createReview = exports.getRestaurantReviews = exports.getRestaurantDetails = exports.getRestaurants = void 0;
const db_1 = __importDefault(require("../db"));
/**
 * Returns a list of all the restaurants.
 */
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // We invoke our user-defined view RestoDetails (see in views.sql).
            const allRestaurants = yield db_1.default.query(`
            SELECT * FROM AllRestaurantCardDetails;
        `);
            res.json({
                restaurants: allRestaurants.rows
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.getRestaurants = getRestaurants;
/**
 * Obtains all the information about a single restaurant by the given id from the req params.
 */
function getRestaurantDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            const restaurant = yield db_1.default.query(`
            SELECT * FROM RestaurantPageDetails($1);
        `, [restaurantId]);
            if (restaurant.rows.length === 0) {
                return res
                    .status(404)
                    .send({ message: 'Restaurant does not exist.' });
            }
            res.json({
                restaurant: restaurant.rows[0],
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.getRestaurantDetails = getRestaurantDetails;
function getRestaurantReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            // Note: We could make a user-defined stored procedure (sql function) instead of this or PLpgSQL.
            const allReviews = yield db_1.default.query(`
            SELECT  rev.id, 
                    rev.title, 
                    rev.content, 
                    rev.rating_overall, 
                    rev.rating_food, 
                    rev.rating_service, 
                    rev.rating_atmosphere, 
                    rev.created_at
            FROM    Restaurants res
                    JOIN Reviews rev on res.id = rev.restaurant
            WHERE   res.id = $1
            ORDER BY rev.created_at DESC;
        `, [restaurantId]);
            res.json({
                reviews: allReviews.rows
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.getRestaurantReviews = getRestaurantReviews;
function createReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            const { title, content, rating_overall, rating_food, rating_service, rating_atmosphere } = req.body;
            const results = yield db_1.default.query(`
            INSERT INTO Reviews (restaurant, title, content, rating_overall, rating_food, rating_service, rating_atmosphere)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [restaurantId, title, content, rating_overall, rating_food, rating_service, rating_atmosphere]);
            const newReview = results.rows[0];
            res.json({
                review: newReview,
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.createReview = createReview;
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { reviewId } = req.params;
            const result = yield db_1.default.query(`
            DELETE FROM Reviews
            WHERE id = $1
            RETURNING *;
        `, [reviewId]);
            if (result.rows.length === 0) {
                return res
                    .status(404)
                    .send({ message: 'Invalid Review ID.' });
            }
            const deletedReview = result.rows[0];
            res.json({
                review: deletedReview
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.deleteReview = deleteReview;
function searchRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query } = req.query;
            // Pattern matches all restaurants that start with the search query in their name,
            // using case-insensitive matching. (COULD MAYBE LATER PATTERN MATCH ANYWHERE ON THE STRING
            // NOT JUST THE START).
            const nameRegexp = `^${query}.*`;
            const matchedRestaurants = yield db_1.default.query(`
            SELECT *
            FROM Restaurants
            WHERE name ~* $1;
        `, [nameRegexp]);
            res.json({
                restaurants: matchedRestaurants.rows,
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.searchRestaurants = searchRestaurants;
/**
 * Creates a single new restaurant.
 *
 * POSTMAN NOTE: For us to be able to send a image file along with the JSON body, we have to
 * use the form-data option under the Body section when sending data to create a restaurant.
 * See how it's done on postman.
 */
function createRestaurant(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, location, price_range, description_short, description_long, } = req.body;
            // Multer middleware automatically gives us access to the file property in the req object.
            // It contains all the info about the uploaded file.
            const fileLocation = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
            // If there was no file uploaded, then we send back an error. (FOR NOW WE CAN UPLOAD NO FILES)
            // if (!req.file?.filename) {
            //     return res
            //     .status(404)
            //     .send({ message: 'No image uploaded' });
            // }
            const result = yield db_1.default.query(`
            INSERT INTO Restaurants (name, location, price_range, description_short, description_long, img_filename)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation]);
            // Return the details of the newly created restaurant.
            const newRestaurant = result.rows[0];
            res.json({
                restaurant: newRestaurant,
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.createRestaurant = createRestaurant;
/**
 * Updates the details of a single restaurant.
 *
 * POSTMAN NOTE: For us to be able to send a image file along with the JSON body, we have to
 * use the form-data option under the Body section when sending data to create a restaurant.
 * See how it's done on postman.
 */
function editRestaurant(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            // We pass in the restaurant attirbutes we want to change as part
            // of the request.
            const { name, location, price_range, description_short, description_long } = req.body;
            const fileLocation = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
            // If there was no file uploaded, then we send back an error. (FOR NOW WE CAN UPLOAD NO FILES)
            // if (!req.file?.filename) {
            //     return res
            //     .status(404)
            //     .send({ message: 'No image uploaded' });
            // }
            const result = yield db_1.default.query(`
            UPDATE Restaurants
            SET name = $1,
                location = $2,
                price_range = $3,
                description_short = $4,
                description_long = $5,
                img_filename = $6
            WHERE id = $7
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation, restaurantId]);
            if (result.rows.length === 0) {
                return res
                    .status(404)
                    .send({ message: 'Invalid Restaurant ID.' });
            }
            const updatedRestaurant = result.rows[0];
            res.json({
                restaurant: updatedRestaurant
            });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.editRestaurant = editRestaurant;
/**
 * Deletes a single restaurant.
 */
function deleteRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            const result = yield db_1.default.query(`
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
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.deleteRestaurant = deleteRestaurant;
