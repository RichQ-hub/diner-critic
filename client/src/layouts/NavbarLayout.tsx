import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

/**
 * This layout wraps around all the pages except the error page, since we don't want
 * the navbar to appear in the not found page.
 */
export default function NavbarLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

/**
 * OUTLET NOTE:
 * Since NavbarLayout wraps child routes, child route components render 
 * where <Outlet> component is.
 */
