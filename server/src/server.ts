import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import restaurants from './routers/restaurants';

// Need to specify the direct path to the .env file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// This means that if the environment variable for port doesn't exist, we
// set it to the default value of 3000.
const port = process.env.PORT || 3000;

// Initialise the express app.
const app: Express = express();

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
app.use(cors());

/**
 * Parses the incoming JSON request into the body of the req object. Can access
 * the data in req.body attribute, which is now a javascript object.
 */
app.use(express.json());

// --------------------------------------------------------------------------------
// Server Routes
// --------------------------------------------------------------------------------

app.use("/api/v1/restaurants", restaurants);

// --------------------------------------------------------------------------------
// Server Listen
// --------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}/`);
});