"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authorize_1 = __importDefault(require("../middleware/authorize"));
const router = express_1.default.Router();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/verify', authorize_1.default, auth_1.verifyToken);
exports.default = router;
