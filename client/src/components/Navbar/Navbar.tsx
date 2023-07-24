import { useEffect, useState } from 'react'
import './Navbar.css';

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
            // console.log(window.scrollY)
        }

        window.addEventListener("scroll", handleNavScroll);

        return (
            window.removeEventListener("scroll", handleNavScroll)
        )

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
            <h2>Nniiiiice</h2>
        </nav>
    )

}
