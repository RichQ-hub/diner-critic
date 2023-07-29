import { useContext, useEffect } from "react"
import { RestaurantsListContext } from "../../context/RestaurantsListContextProvider"
import { restaurantsData } from "../../data/restaurantsData";

import './RestaurantFinder.css';

export default function RestaurantFinder() {
    const { restaurantsList, setRestaurantsList } = useContext(RestaurantsListContext);

    useEffect(() => {
        setRestaurantsList(restaurantsData);
    }, [])

    return (
        <main>
            {restaurantsList.map((restaurant) => {
                const { id, name, location, priceRange } = restaurant;
                return (
                    <div key={id}>
                        {`${id}, ${name}, ${location}, ${priceRange}`}
                    </div>
                )
            })}
            <div>RestaurantFinder</div>
        </main>
    )
}
