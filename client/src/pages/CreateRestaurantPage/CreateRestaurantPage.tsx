import { useNavigate } from "react-router-dom";
import "./CreateRestaurantPage.css";
import { useState } from "react";
import { useFormInputText } from "../../hooks/useFormInputText";
import FormItemText from "../../components/FormItemText/FormItemText";
import PriceRangeSelect from "../../components/PriceRangeSelect/PriceRangeSelect";
import RestaurantsService from "../../services/RestaurantsService"

export default function CreateRestaurantPage() {
    const name = useFormInputText();
    const location = useFormInputText();
    const [priceRange, setPriceRange] = useState<number>(1);
    const shortDesc = useFormInputText();
    const longDesc = useFormInputText();
    const [selectedImg, setSelectedImg] = useState<File>();

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();

        if (selectedImg) {
            formData.append("image", selectedImg);
        }

        formData.append("name", name.value);
        formData.append("location", location.value);
        formData.append("price_range", priceRange.toString());
        formData.append("description_short", shortDesc.value);
        formData.append("desacription_long", longDesc.value);

        RestaurantsService.createRestaurant(formData);

        // Redirect back to the search page.
        navigate("/restaurants");
    }

    function handleChangePriceRange(value: number) {
        setPriceRange(value);
    }

    function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setSelectedImg(e.target.files[0]);
        }
    }

    return (
        <main className="rest-page-create">
            <h1 className="create-rest-title">Create A New Restaurant</h1>
            <form className="create-rest-form" action="" onSubmit={handleSubmit}>
                <FormItemText title="Name" />
                <FormItemText title="Location" />
                <PriceRangeSelect 
                    selectedItem={priceRange.toString()}
                    handleChangePriceRange={handleChangePriceRange}
                />
                <FormItemText title="Short Description (Displayed on Search Page)" />
                <FormItemText title="Long Description (Displayed on Review Page)" />

                <input type="file" accept="image/*" onChange={handleImgUpload}/>

                <button type="submit">Create New Restaurant</button>
            </form>
        </main>
    )
}
