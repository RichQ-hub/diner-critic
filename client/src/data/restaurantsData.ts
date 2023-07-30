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
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img: cafeDinerImg,
    },
    {
        id: "2",
        name: "Bake Shop",
        location: "Japan",
        price_range: 5,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img: bakeShopImg,
    },
    {
        id: "3",
        name: "Burger Joint",
        location: "Sudan",
        price_range: 2,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img: burgerJointImg,
    },
    {
        id: "4",
        name: "Cyber Foods",
        location: "Mongolia",
        price_range: 2,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vestibulum dictum metus vitae tempus maximus. Duis hendrerit turpis vel 
        rutrum venenatis. Integer sit amet pellentesque metus.`,
        img: cyberFoodsImg,
    },
]