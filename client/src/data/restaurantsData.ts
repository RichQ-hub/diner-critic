import { RestaurantState } from "../types/types";
import cafeDinerImg from "../assets/images/restaurants/cafe-diner.gif";
import bakeShopImg from "../assets/images/restaurants/bake-shop.gif";
import burgerJointImg from "../assets/images/restaurants/burger-joint.gif";
import cyberFoodsImg from "../assets/images/restaurants/cyber-foods.gif";

export const restaurantsData: RestaurantState[] = [
    {
        rest_id: "1",
        name: "Cafe Diner",
        location: "Europe",
        price_range: 3,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: cafeDinerImg,
        num_reviews: 2,
        avg_rating: 2
    },
    {
        rest_id: "2",
        name: "Bake Shop",
        location: "Japan",
        price_range: 5,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: bakeShopImg,
        num_reviews: 2,
        avg_rating: 2
    },
    {
        rest_id: "3",
        name: "Burger Joint",
        location: "Sudan",
        price_range: 2,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: burgerJointImg,
        num_reviews: 2,
        avg_rating: 2
    },
    {
        rest_id: "4",
        name: "Cyber Foods",
        location: "Mongolia",
        price_range: 2,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: cyberFoodsImg,
        num_reviews: 2,
        avg_rating: 2
    },
]