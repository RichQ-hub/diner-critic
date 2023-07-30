/**
 * Why use axios?
 * It has robust error handling, and thus we don't need to check
 * and throw an error with a try catch block.
 */

import axios from "axios";
import BACKEND_URL from "./backendURL";

/**
 * Handles all the api calls for the /restaurants router in the backend API.
 */
export const RestaurantsAPI = axios.create({
    baseURL: `${BACKEND_URL}/restaurants`,
});

// Could add interceptor so that each requests has a token stored in its header.