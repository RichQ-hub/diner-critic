import { useState, createContext, ReactNode } from "react"
import { Restaurant } from "../types/types"

interface IRestaurantsListContext {
    restaurantsList: Restaurant[];
    setRestaurantsList: React.Dispatch<React.SetStateAction<Restaurant[]>>; 
}

/**
 * NOTE: setRestaurantsList function.
 * This function has to be of type:
 *      React.Dispatch<React.SetStateAction<Restaurant[]>>
 * instead of:
 *      (restaurantsList: Restaurant[]) => void
 * 
 * Why?
 * Because a normal setState function takes a value, but also a function (oldval) => {*logic here*}.
 * Since it also accepts a function, the 2nd function type above doesn't accept functions, hence
 * we cannot provide a function that uses the old value.
 */

interface RestaurantsListContextProviderProps {
    children: ReactNode;
}

export const RestaurantsListContext = createContext({} as IRestaurantsListContext)

export default function RestaurantsListContextProvider({children}: RestaurantsListContextProviderProps) {
    const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);

    return (
        <RestaurantsListContext.Provider value={{ restaurantsList, setRestaurantsList }}>
            {children}
        </RestaurantsListContext.Provider>
    )
}
