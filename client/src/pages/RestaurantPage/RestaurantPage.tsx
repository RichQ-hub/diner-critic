import { Link, useParams } from 'react-router-dom'

export default function RestaurantPage() {
    const { restaurantId } = useParams();
    return (
        <>
            <div>RestaurantPage {restaurantId}</div>
            <Link to="/mate">Go back</Link>
        </>
    )
}
