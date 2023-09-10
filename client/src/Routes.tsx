import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RestaurantFinder from "./pages/RestaurantFinder";
import RestaurantPage from "./pages/RestaurantPage";
import UpdateRestaurantPage from "./pages/UpdateRestaurantPage/UpdateRestaurantPage";
import NavbarLayout from "./layouts/NavbarLayout";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

/**
 * Utilising React Router v6.14.
 * @returns Router Component
 */
export default function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <NavbarLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                }
            ]
        },
        {
            path: '/restaurants',
            element: <NavbarLayout />,
            // NOTE: If we added <RestaurantFinder> component as an element here, it would've been 
            // used as a layout page, where we would use <Outlet> to render its children.
            children: [
                // This is our index page for when we just visit /restaurants without any children.
                {
                    index: true,
                    // Here we immediately redirect to the search page when accessing the root 
                    // index '/restaurants' route. So essentially, the '/restaurants/search' route
                    // is basically the index route.
                    element: <Navigate to="search"/>,
                },
                {
                    path: 'search',
                    element: <RestaurantFinder />,
                },
                {
                    path: 'create',
                    element: <CreateRestaurantPage />,
                },
                {
                    path: ':restaurantId',
                    children: [
                        {
                            index: true,
                            element: <RestaurantPage />,
                        },
                        {
                            path: 'update',
                            element: <UpdateRestaurantPage />,
                        }
                    ]
                }
            ],
        },
        {
            path: '/auth',
            element: <NavbarLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to='login' />
                },
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                }
            ],
        },
        {
            path: '*',
            element: <ErrorPage />,
        }
    ]);

    return <RouterProvider router={router} />;
}
