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
exports.restaurants_delete = exports.restaurants_edit = exports.restaurants_create = exports.restaurants_list = void 0;
const db_1 = __importDefault(require("../db"));
/**
 * Lists all the restaurants.
 */
function restaurants_list() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`
        SELECT * 
        FROM Restaurants
        ;
    `);
        return {
            restaurants: result.rows,
        };
    });
}
exports.restaurants_list = restaurants_list;
/**
 * Creates a new restaurant.
 */
function restaurants_create(name, location, price_range) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`
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
        };
    });
}
exports.restaurants_create = restaurants_create;
/**
 * Updates an existing restaurant.
 */
function restaurants_edit(restaurant_id, name, location, price_range) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`
        UPDATE Restaurants
        SET name = $1,
            location = $2,
            price_range = $3
        WHERE id = $4
        RETURNING *;
    `, [name, location, price_range, restaurant_id]);
        // If the restaurant didn't exist, then we would've returned
        // nothing.
        return {};
    });
}
exports.restaurants_edit = restaurants_edit;
/**
 * Deletes an existing restaurant.
 */
function restaurants_delete(restaurant_id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query(`
        DELETE FROM Restaurants
        WHERE id = $1
        ;
    `, [restaurant_id]);
        return {};
    });
}
exports.restaurants_delete = restaurants_delete;
