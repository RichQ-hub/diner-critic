export interface RestaurantState {
    rest_id: string;
    name: string;
    location: string;
    price_range: number;
    description_short: string;
    img_filename: string;
    num_reviews: number;
    avg_rating: number;
}

export interface ReviewState {
    id: string;
    title: string;
    content: string;
    rating_overall: number;
    rating_food: number;
    rating_service: number;
    rating_atmosphere: number;
    created_at: string;
}