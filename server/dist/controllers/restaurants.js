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
exports.deleteRestaurant = exports.editRestaurant = exports.createRestaurant = exports.getOneRestaurant = exports.getRestaurants = void 0;
const db_1 = __importDefault(require("../db"));
/**
 * Returns a list of all the restaurants.
 */
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allRestaurants = yield db_1.default.query(`
            SELECT *
            FROM Restaurants;
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
 * Obtains a single restaurant by the given id from the req params.
 */
function getOneRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            const restaurant = yield db_1.default.query(`
            SELECT * 
            FROM Restaurants
            WHERE id = $1;
        `, [restaurantId]);
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
exports.getOneRestaurant = getOneRestaurant;
/**
 * Creates a single new restaurant.
 */
function createRestaurant(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, location, price_range, description_short, description_long, } = req.body;
            // Multer middleware automatically gives us access to the file property in the req object.
            // It contains all the info about the uploaded file.
            const fileLocation = `storage/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
            // If there was no file uploaded, then we send back an error.
            if (!((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename)) {
                return res
                    .status(404)
                    .send({ message: 'No image uploaded' });
            }
            console.log(fileLocation);
            const result = yield db_1.default.query(`
            INSERT INTO Restaurants (name, location, price_range, description_short, description_long, img_href)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, location, price_range, description_short, description_long, fileLocation]);
            console.log("nope");
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
 */
function editRestaurant(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantId } = req.params;
            // We pass in the restaurant attirbutes we want to change as part
            // of the request.
            const { name, location, price_range, description_short, description_long } = req.body;
            const fileLocation = `storage/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
            // If there was no file uploaded, then we send back an error.
            if (!((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename)) {
                return res
                    .status(404)
                    .send({ message: 'No image uploaded' });
            }
            const result = yield db_1.default.query(`
            UPDATE Restaurants
            SET name = $1,
                location = $2,
                price_range = $3,
                description_short = $4,
                description_long = $5,
                img_ref = $6
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
