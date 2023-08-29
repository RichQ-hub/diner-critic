import { useNavigate } from "react-router-dom";
import "./CreateRestaurantPage.css";
import { useState } from "react";
import { useFormInputText } from "../../hooks/useFormInputText";
import FormItemText from "../../components/FormItemText/FormItemText";
import FormItemTextarea from "../../components/FormItemTextarea/FormItemTextarea";
import PriceRangeSelect from "../../components/PriceRangeSelect/PriceRangeSelect";
import RestaurantsService from "../../services/RestaurantsService";
import FormItemFile from "../../components/FormItemFile/FormItemFile";

/**Class Names for each input for this page. */

const PAGE_STYLE_CLASSNAME = 'create-rest-input';
const TEXT_STYLE_CLASSNAME = 'create-rest-text input--bg';
const SELECT_STYLE_CLASSNAME = 'create-rest-select input--bg';
const TEXTAREA_STYLE_CLASSNAME = 'create-rest-textarea input--bg';
const FILE_STYLE_CLASSNAME = 'create-rest-file';

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

            /**
             * NOTE:
             * Below line allows us to upload the same file, since onChange event
             * is not fired when uploading the same file to input=file type.
             * Hence, we need to set the value so the empty string for the 
             * event object.
             * 
             * Ref: https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file
             */
            e.currentTarget.value = "";
        }
    }

    return (
        <main className="rest-page-create">
            <h1 className="create-rest-title">Create A New Restaurant</h1>
            <form className="create-rest-form" action="" onSubmit={handleSubmit}>
                <FormItemText 
                    title="Name" 
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={TEXT_STYLE_CLASSNAME}
                    onChange={name.handleChange} 
                />
                <FormItemText 
                    title="Location" 
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={TEXT_STYLE_CLASSNAME}
                    onChange={location.handleChange} 
                />
                <PriceRangeSelect 
                    selectedItem={priceRange.toString()}
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={SELECT_STYLE_CLASSNAME}
                    handleChangePriceRange={handleChangePriceRange}
                />
                <FormItemTextarea 
                    title="Short Description (Displayed on Search Page)" 
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={TEXTAREA_STYLE_CLASSNAME}
                    onChange={shortDesc.handleChange}
                />
                <FormItemTextarea 
                    title="Long Description (Displayed on Review Page)" 
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={TEXTAREA_STYLE_CLASSNAME}
                    onChange={longDesc.handleChange}
                />

                <FormItemFile 
                    title="Restaurant Image"
                    pageStyle={PAGE_STYLE_CLASSNAME}
                    inputStyle={FILE_STYLE_CLASSNAME}
                    selectedImgName={selectedImg?.name}
                    handleRemoveSelectedImg={() => setSelectedImg(undefined)}
                    onChange={handleImgUpload}
                /> 

                <button className="create-rest-submit-btn" type="submit">Create New Restaurant</button>
            </form>
        </main>
    )
}
