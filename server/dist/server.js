"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const restaurants_1 = __importDefault(require("./routers/restaurants"));
// Need to specify the direct path to the .env file.
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// This means that if the environment variable for port doesn't exist, we
// set it to the default value of 3000.
const port = process.env.PORT || 3000;
// Initialise the express app.
const app = (0, express_1.default)();
// --------------------------------------------------------------------------------
// Middleware
// --------------------------------------------------------------------------------
/**
 * Parses the incoming JSON request into the body of the req object. Can access
 * the data in req.body attribute, which is now a javascript object.
 */
app.use(express_1.default.json());
// --------------------------------------------------------------------------------
// Server Routes
// --------------------------------------------------------------------------------
app.use("/api/v1/restaurants", restaurants_1.default);
// --------------------------------------------------------------------------------
// Server Listen
// --------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at http://localhost:${port}/`);
});
