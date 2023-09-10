import { useContext, useEffect, useState } from "react"
import { RestaurantsListContext } from "../../context/RestaurantsListContextProvider"
import RestaurantsService from "../../services/RestaurantsService";

import './RestaurantFinder.css';
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import FilterAside from "../../components/FilterAside/FilterAside";
import RestaurantSearchToolbar from "../../components/RestaurantSearchHeading/RestaurantSearchToolbar";

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
        <main className="rest-search-page">
            <section className={`rest-finder ${isScrolled ? 'rest-finder--scrolled' : ''}`}>
                {/* Filter section */}
                <FilterAside />

                <div className="rest-right">
                    {/* Page Title */}
                    <h1>Restaurants</h1>

                    <RestaurantSearchToolbar />

                    {/* Restaurants List Section */}
                    <div className="rest-list">
                        {restaurantsList.map((restaurant) => {
                            const { rest_id, name, location, price_range, description_short, img_filename, num_reviews, avg_rating } = restaurant;
                            return (
                                <RestaurantCard 
                                    key={rest_id}
                                    id={rest_id}
                                    name={name}
                                    location={location}
                                    price_range={price_range}
                                    description_short={description_short}
                                    img_filename={img_filename}
                                    num_reviews={num_reviews}
                                    avg_rating={avg_rating}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}
