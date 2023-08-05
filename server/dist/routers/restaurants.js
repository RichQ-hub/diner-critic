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
router.get('/:restaurantId', restaurants_1.getOneRestaurant);
router.post('/', multerStorage_1.default.single("image"), restaurants_1.createRestaurant);
router.put('/:restaurantId', multerStorage_1.default.single("image"), restaurants_1.editRestaurant);
router.delete('/:restaurantId', restaurants_1.deleteRestaurant);
exports.default = router;
