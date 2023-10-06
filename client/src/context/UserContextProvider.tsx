import { useState, createContext, ReactNode } from "react"
import { RestaurantState } from "../types/types"

interface IUserContext {
    restaurantsList: RestaurantState[];
    setRestaurantsList: React.Dispatch<React.SetStateAction<RestaurantState[]>>; 
}

/**
 * NOTE: setRestaurantsList function.
 * This function has to be of type:
 *      React.Dispatch<React.SetStateAction<RestaurantState[]>>
 * instead of:
 *      (restaurantsList: RestaurantState[]) => void
 * 
 * Why?
 * Because a normal setState function takes a value, but also a function (oldval) => {*logic here*}.
 * Since it also accepts a function, the 2nd function type above doesn't accept functions, hence
 * we cannot provide a function that uses the old value.
 */

interface RestaurantsListContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as IUserContext)

export default function RestaurantsListContextProvider({children}: RestaurantsListContextProviderProps) {
    const [restaurantsList, setRestaurantsList] = useState<RestaurantState[]>([]);

    return (
        <UserContext.Provider value={{ restaurantsList, setRestaurantsList }}>
            {children}
        </UserContext.Provider>
    )
}
