"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const multerStorage_1 = __importDefault(require("./middleware/multerStorage"));
// Routers.
const restaurants_1 = __importDefault(require("./routers/restaurants"));
const auth_1 = __importDefault(require("./routers/auth"));
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
 * Cross-Origin Resource Sharing (CORS) or "Same Origin Policy" basically states
 * that only requests from the same origin (the same IP address or URL) should
 * be allowed to access this API.
 *
 * For now, it is acceptable to just allow access from any origin. This makes
 * development quite a bit easier but for any real project, once you deploy to
 * a production environment you will probably want to specifically block access
 * from any origin except your frontend website.
 */
app.use((0, cors_1.default)());
/**
 * Morgan allows us to log useful information regarding incoming requests into
 * the terminal.
 */
app.use((0, morgan_1.default)("dev"));
/**
 * Parses the incoming JSON request into the body of the req object. Can access
 * the data in req.body attribute, which is now a javascript object.
 */
app.use(express_1.default.json());
// --------------------------------------------------------------------------------
// Server Routes
// --------------------------------------------------------------------------------
const rootRoute = '/api/v1';
app.use(`${rootRoute}/restaurants`, restaurants_1.default);
app.use(`${rootRoute}/auth`, auth_1.default);
// TEST ROUTE FOR UPLOADING FILES.
app.post(`${rootRoute}/upload`, multerStorage_1.default.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Upload single file success.");
});
// --------------------------------------------------------------------------------
// Server Listen
// --------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at http://localhost:${port}/`);
});
