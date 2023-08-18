import { useNavigate } from "react-router-dom";
import "./CreateRestaurantPage.css";
import { useState } from "react";
import { useFormInputText } from "../../hooks/useFormInputText";
import FormItemText from "../../components/FormItemText/FormItemText";
import FormItemTextarea from "../../components/FormItemTextarea/FormItemTextarea";
import PriceRangeSelect from "../../components/PriceRangeSelect/PriceRangeSelect";
import RestaurantsService from "../../services/RestaurantsService";
import FormItemFile from "../../components/FormItemFile/FormItemFile";

export default function CreateRestaurantPage() {
    const name = useFormInputText();
    const location = useFormInputText();
    const [priceRange, setPriceRange] = useState<number>(1);
    const shortDesc = useFormInputText();
    const longDesc = useFormInputText();
    const [selectedImg, setSelectedImg] = useState<File>();

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log("nice")

        const formData = new FormData();

        if (selectedImg) {
            formData.append("image", selectedImg);
        }

        formData.append("name", name.value);
        formData.append("location", location.value);
        formData.append("price_range", priceRange.toString());
        formData.append("description_short", shortDesc.value);
        formData.append("desacription_long", longDesc.value);

        await RestaurantsService.createRestaurant(formData);

        // Redirect back to the search page.
        navigate("/restaurants");
    }

    function handleChangePriceRange(value: number) {
        setPriceRange(value);
    }

    function handleImgUpload(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            setSelectedImg(e.currentTarget.files[0]);
        }
    }

    return (
        <main className="rest-page-create">
            <h1 className="create-rest-title">Create A New Restaurant</h1>
            <form className="create-rest-form" action="" onSubmit={handleSubmit}>
                <FormItemText 
                    title="Name" 
                    onChange={name.handleChange} 
                />
                <FormItemText 
                    title="Location" 
                    onChange={location.handleChange} 
                />
                <PriceRangeSelect 
                    selectedItem={priceRange.toString()}
                    handleChangePriceRange={handleChangePriceRange}
                />
                <FormItemTextarea 
                    title="Short Description (Displayed on Search Page)" 
                    onChange={shortDesc.handleChange}
                />
                <FormItemTextarea 
                    title="Long Description (Displayed on Review Page)" 
                    onChange={longDesc.handleChange}
                />

                <FormItemFile 
                    title="Restaurant Image"
                    selectedImgName={selectedImg?.name}
                    handleRemoveSelectedImg={() => setSelectedImg(undefined)}
                    onChange={handleImgUpload}
                /> 

                <button className="create-rest-submit-btn" type="submit">Create New Restaurant</button>
            </form>
        </main>
    )
}
