import { Link, useSearchParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { RestaurantsListContext } from "../../context/RestaurantsListContextProvider";
import RestaurantsService from "../../services/RestaurantsService";

import "./RestaurantSearchToolbar.css";

export default function RestaurantSearchToolbar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { setRestaurantsList } = useContext(RestaurantsListContext);

    /**
     * Handles search query, setting the restaurants list to all the restaurants that
     * match the user input's search query.
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (searchQuery) {
            e.preventDefault();
            setSearchParams(params => {
                params.set("query", searchQuery);
                return params;
            });
        }
        const data = await RestaurantsService.searchRestaurants(searchParams.get("query") as string);
        setRestaurantsList(data.restaurants);
    }

    function handleChangeSearchQuery(e: React.FormEvent<HTMLInputElement>) {
        setSearchQuery(e.currentTarget.value);
    }

    return (
        <div className="rest-toolbar">
            {/* Search Bar */}
            <form className="rest-search" action="" onSubmit={handleSubmit}>
                <input 
                    className="rest-search__bar" 
                    type="text" 
                    placeholder="Search Restaurants"
                    value={searchQuery}
                    onChange={handleChangeSearchQuery}
                />
                <button className="rest-search__button" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </button>
            </form>

            {/* Create New Restaurant Button */}
            <Link to="../create" className="rest-add-restaurant">
                <p>Add Restaurant</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </Link>
        </div>
    )
}
