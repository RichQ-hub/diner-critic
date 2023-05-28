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
const express_1 = __importDefault(require("express"));
// Features.
const restaurants_1 = require("../features/restaurants");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, restaurants_1.restaurants_list)();
        res.json({
            status: 'success',
            data: {
                restaurants: result.restaurants,
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const location = req.body.restaurant;
        const price_range = req.body.price_range;
        const result = yield (0, restaurants_1.restaurants_create)(name, location, price_range);
        res.json({
            status: 'success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const location = req.body.location;
        const price_range = req.body.price_range;
        res.json({
            status: "success",
            data: yield (0, restaurants_1.restaurants_edit)(restaurant_id, name, location, price_range)
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant_id = req.body.restaurant_id;
        res.json({
            status: "success",
            data: yield (0, restaurants_1.restaurants_delete)(restaurant_id)
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
