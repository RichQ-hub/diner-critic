import { useContext, useEffect, useState } from "react"
import { RestaurantsListContext } from "../../context/RestaurantsListContextProvider"
import { restaurantsData } from "../../data/restaurantsData";
import RestaurantsService from "../../services/RestaurantsService";

import './RestaurantFinder.css';
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import FilterAside from "../../components/FilterAside/FilterAside";

export default function RestaurantFinder() {
    const { restaurantsList, setRestaurantsList } = useContext(RestaurantsListContext);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    /**
     * Fetches restaurant data when this page component mounts.
     */
    useEffect(() => {
        async function fetchData() {
            const data = await RestaurantsService.getRestaurants();
            setRestaurantsList(data.restaurants);
        }
        fetchData();
        // setRestaurantsList(restaurantsData); // Use this test data for now for styling.
    }, [])

    /**
     * Attatches window scroll event to detect when the page is not scrolled down.
     */
    useEffect(() => {
        function handlePageScroll() {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener("scroll", handlePageScroll);

        return () => {
            window.removeEventListener("scroll", handlePageScroll);
        }
    }, [])

    return (
        <main className="rest-page">
            <section className={`rest-finder ${isScrolled ? 'rest-finder--scrolled' : ''}`}>
                {/* Filter section */}
                <FilterAside />

                <div className="rest-right">
                    {/* Page Title */}
                    <h1>Restaurants</h1>

                    {/* Restaurants List Section */}
                    <div className="rest-list">
                        {restaurantsList.map((restaurant) => {
                            const { id, name, location, price_range, description_short, img_filename } = restaurant;
                            return (
                                <RestaurantCard 
                                    key={id}
                                    id={id}
                                    name={name}
                                    location={location}
                                    price_range={price_range}
                                    description_short={description_short}
                                    img_filename={img_filename}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}
