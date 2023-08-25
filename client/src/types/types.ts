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

export interface RestaurantSummaryState {
    name: string;
    location: string;
    description_long: string;
    img_filename: string;
    num_reviews: number;
    overall_rating_avg: number;
    food_rating_avg: number;
    service_rating_avg: number;
    atmosphere_rating_avg: number;
}