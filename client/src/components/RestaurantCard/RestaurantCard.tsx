import { Link } from "react-router-dom";
import "./RestaurantCard.css";
import { useEffect, useState } from "react";

interface RestaurantCardProps {
    id: string;
    name: string;
    location: string;
    price_range: number;
    description_short: string;
    img_filename: string;
}

export default function RestaurantCard(props: RestaurantCardProps) {
    const { 
        id, 
        name, 
        location, 
        price_range, 
        description_short, 
        img_filename, 
    } = props;

    const [imgRef, setImgRef] = useState<string>("");

    /**
     * Loads the restaurant img dynamically using dynamic import syntax.
     */
    useEffect(() => {
        async function getImageImport() {
            /**
             * NOTE: We store restaurant images in the client assets folder, since we cannot use
             * the dynamic import() function to import images outside of the client/src
             * folder.
             */
            try {
                const img = await import(`../../assets/storage/${img_filename}`);
                // The import() function returns a Module object, and the actual link to
                // the image is stored in the "default" property.
                setImgRef(img.default);
            } catch (error) {
                console.log(error);
            }
            
        };
        getImageImport();
    }, []);

    return (
        /**
         * NOTE:
         * This link navigates to a sibling route by going back up to the parent with '../', 
         * and then accesses the individual restaurant page.
         */
        <Link className="rest-card" to={`../${id}`}>
            <div className="rest-card__img-wrapper">
                <img className="rest-card__img" src={imgRef} alt="" />
            </div>
            <div className="rest-card__content">
                <h2 className="rest-card__name">{name}</h2>
                <p className="rest-card__desc">{description_short}</p>
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
