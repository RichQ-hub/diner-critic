import { useState, createContext, ReactNode } from "react"
import { Restaurant } from "../types/types"

interface RestaurantsListContext {
    restaurantsList: Restaurant[],
    setRestaurantsList: (restaurantsList: Restaurant[]) => void
}

interface RestaurantsListContextProviderProps {
    children: ReactNode,
}

const RestaurantsListContext = createContext({} as RestaurantsListContext)

export default function RestaurantsListContextProvider({children}: RestaurantsListContextProviderProps) {
    const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);

    return (
        <RestaurantsListContext.Provider value={{ restaurantsList, setRestaurantsList }}>
            {children}
        </RestaurantsListContext.Provider>
    )
}
