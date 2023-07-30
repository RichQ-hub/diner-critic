import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * The purpose of this component ensures that whenever we transition to a 
 * new page by clicking one of the nav links, we always appear on that new page
 * at the very top. This is because by default in react router, when you click
 * on a new page it stays on the same y-coord as when you left it.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return null;
}

// Source: https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
