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

interface ReviewPayload {
    title: string;
    content: string;
    rating_overall: number;
    rating_food: number;
    rating_service: number; 
    rating_atmosphere: number;
}

class AuthService {
    async login() {
        const response = await RestaurantsAPI.get("/");
        return response.data;
    }

    async getRestaurantDetails(restaurantId: string) {
        const response = await RestaurantsAPI.get(`/${restaurantId}`);
        return response.data;
    }

    async searchRestaurants(searchQuery: string) {
        const response = await RestaurantsAPI.get(`/search?query=${searchQuery}`);
        return response.data;
    }

    async createRestaurant(payload: FormData) {
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

    async getRestaurantReviews(restaurantId: string) {
        const response = await RestaurantsAPI.get(`/${restaurantId}/reviews`);
        return response.data;
    }

    async createReview(restaurantId: string, payload: ReviewPayload) {
        const response = await RestaurantsAPI.post(`/${restaurantId}/reviews`, payload);
        return response.data;
    }

    async delete(restaurantId: string, reviewId: string) {
        const response = await RestaurantsAPI.delete(`/${restaurantId}/reviews/${reviewId}`);
        return response.data;
    }
}

const service = new AuthService();

export default service;