import { Restaurant } from "../types/types";
import cafeDinerImg from "../assets/images/restaurants/cafe-diner.gif";
import bakeShopImg from "../assets/images/restaurants/bake-shop.gif";
import burgerJointImg from "../assets/images/restaurants/burger-joint.gif";
import cyberFoodsImg from "../assets/images/restaurants/cyber-foods.gif";

export const restaurantsData: Restaurant[] = [
    {
        id: "1",
        name: "Cafe Diner",
        location: "Europe",
        price_range: 3,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: cafeDinerImg,
    },
    {
        id: "2",
        name: "Bake Shop",
        location: "Japan",
        price_range: 5,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: bakeShopImg,
    },
    {
        id: "3",
        name: "Burger Joint",
        location: "Sudan",
        price_range: 2,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: burgerJointImg,
    },
    {
        id: "4",
        name: "Cyber Foods",
        location: "Mongolia",
        price_range: 2,
        description_short: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img_filename: cyberFoodsImg,
    },
]