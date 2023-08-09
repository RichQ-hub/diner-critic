import { useNavigate } from "react-router-dom";
import "./CreateRestaurantPage.css";

export default function CreateRestaurantPage() {
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Redirect back to the search page.
        navigate("/restaurants");
    }

    return (
        <main className="rest-page-create">
            <h1 className="create-rest-title">Create A New Restaurant</h1>
            <form className="create-rest-form" action="" onSubmit={handleSubmit}>
                <div className="create-rest-form-item">
                    <label htmlFor="rest-name">Name</label>
                    <input className="create-rest-input input--bg" type="text" name="rest-name" id="rest-name" />
                </div>

                <div className="create-rest-form-item">
                    <label htmlFor="rest-location">Location</label>
                    <input className="create-rest-input input--bg" type="text" name="rest-location" id="rest-location" />
                </div>

                <div className="create-rest-form-item">
                    <label htmlFor="rest-price-range">Price Range</label>
                    <select className="create-rest-input input--bg" name="rest-price-range" id="rest-price-range">
                        
                    </select>
                </div>

                <div className="create-rest-form-item">
                    <label htmlFor="rest-short-desc">Short Description</label>
                    <input className="create-rest-input input--bg" type="text" name="rest-short-desc" id="rest-short-desc" />
                </div>

                <div className="create-rest-form-item">
                    <label htmlFor="rest-long-desc">Long Description</label>
                    <input className="create-rest-input input--bg" type="text" name="rest-long-desc" id="rest-long-desc" />
                </div>

                <div className="create-rest-form-item">
                    <label htmlFor="">Restaurant Image</label>
                    <input type="file" name="" id="rest-image" accept="image/*"/>
                </div>

                <button type="submit">Create New Restaurant</button>
            </form>
        </main>
    )
}
