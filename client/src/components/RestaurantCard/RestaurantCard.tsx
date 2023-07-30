import { Link } from "react-router-dom";
import "./RestaurantCard.css";

interface RestaurantCardProps {
    id: string;
    name: string;
    location: string;
    price_range: number;
    description: string;
    img: string;
}

export default function RestaurantCard(props: RestaurantCardProps) {
    const { 
        id, 
        name, 
        location, 
        price_range, 
        description, 
        img 
    } = props;

    return (
        <Link className="rest-card" to={`${id}`}>
            <div className="rest-card__img-wrapper">
                <img className="rest-card__img" src={img} alt="" />
            </div>
            <div className="rest-card__content">
                <h2 className="rest-card__name">{name}</h2>
                <p className="rest-card__desc">{description}</p>
            </div>
            <div className="rest-card__tags">
                {/* Note: Could probably make a tag component. */}
                <div className="rest-tag">
                    <div className="rest-tag__location">
                        <h3>Location</h3>
                    </div>
                    <p className="rest-tag__value">{location}</p>
                </div>
                <div className="rest-tag">
                    <div className="rest-tag__price">
                        <h3>Price Range</h3>
                    </div>
                    <p className="rest-tag__value">{"$".repeat(price_range)}</p>
                </div>
            </div>
        </Link>
    )
}
