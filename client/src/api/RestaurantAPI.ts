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

/**
 * Axios Interceptor:
 * 
 */

RestaurantsAPI.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');

    // If the token exists in localstorage, we add it as a header in the request to send 
    // to the backend.
    if (token) {
        req.headers['token'] = token;
    }

    return req;
});