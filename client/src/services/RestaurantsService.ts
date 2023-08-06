/**
 * This file contains all the api calls in the restaurants
 * router from our backend.
 */

import { RestaurantsAPI } from "../api/RestaurantAPI";

interface RestaurantPayload {
    name: string;
    location: string;
    price_range: number;
}

class RestaurantsService {
    async getRestaurants() {
        const response = await RestaurantsAPI.get("/");
        return response.data;
    }

    async getOneRestaurant(restaurantId: string) {
        const response = await RestaurantsAPI.get(`/${restaurantId}`);
        return response.data;
    }

    async searchRestaurants(searchQuery: string) {
        const response = await RestaurantsAPI.get(`/search?query=${searchQuery}`);
        return response.data;
    }

    async createRestaurant(payload: RestaurantPayload) {
        const response = await RestaurantsAPI.post("/", payload);
        return response.data;
    }

    async editRestaurant(restaurantId: string, payload: RestaurantPayload) {
        const response = await RestaurantsAPI.put(`/${restaurantId}`, payload);
        return response.data;
    }

    async deleteRestaurant(restaurantId: string) {
        const response = await RestaurantsAPI.delete(`/${restaurantId}`);
        return response.data;
    }
}

const service = new RestaurantsService();

export default service;