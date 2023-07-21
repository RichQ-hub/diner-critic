import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateRestaurantPage() {
    const { restaurantId } = useParams();
    return (
        <div>UpdateRestaurantPage {restaurantId}</div>
    )
}
