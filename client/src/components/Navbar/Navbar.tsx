import { useEffect, useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';

import logoSmall from '../../assets/images/nav-logo-small.png';
import logoLarge from '../../assets/images/nav-logo-large.png';

interface Navlink {
    name: string,
    href: string
}

const NAV_LINKS: Navlink[] = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Restaurants",
        href: "/restaurants"
    }
]

export default function Navbar() {
    const [isSticky, setIsSticky] = useState<boolean>(false);

    /**
     * Attach a scroll event listener using useEffect. We need useEffect since its purpose is to 
     * interact with external systems, like API calls and in this case the DOM API, specifically
     * the window object.
     */
    useEffect(() => {
        function handleNavScroll() {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleNavScroll);

        return () => {
            window.removeEventListener("scroll", handleNavScroll);
        }

        /**
         * How this works:
         * We attach a scroll event listener to the window object (which is like the 
         * global object that is the top level element to every DOM node). We essentially
         * detect if the the user has scrolled down past the top of the page, which should
         * transition the navbar to its sticky form.
         */
    }, []);

    return (
        <nav 
            className={`nav ${isSticky ? 'nav--sticky' : ''}`}
        >
            {!isSticky ? (
                <div className="nav__logo-wrapper">
                    <img src={logoLarge} alt="" className="nav__logo-large" />
                </div>
            ) : (
                <img src={logoSmall} alt="" className="nav__logo-small" />
            )}
            
            <div className="nav__links">
                {NAV_LINKS.map((link, idx) => {
                    const { name, href } = link;
                    return (
                        <Link key={idx} to={href}>
                            <p>{name}</p>
                        </Link>
                    )
                })}
            </div>
            {/* Login Button */}
            <Link to="login" className="nav__login">
                <p>Login</p>
            </Link>
        </nav>
    )

}
