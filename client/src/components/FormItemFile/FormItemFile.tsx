import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemFileProps {
    title: string;
    selectedImgName: string | undefined;
    handleRemoveSelectedImg: () => void;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function FormItemFile(props: FormItemFileProps) {
    const { 
        title,
        selectedImgName,
        handleRemoveSelectedImg,
        onChange 
    } = props;

    return (
        <FormItem title={title}>
            {/* Here it is easier to style the label instead of the input type=file */}
            <label className='create-rest-file' htmlFor="rest-img">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                <p>Browse Images</p>
            </label>

            {
                selectedImgName && 
                <div className='file-upload-card'>
                    <p>{selectedImgName}</p>
                    <div className='file-upload-card__trash-icon' onClick={handleRemoveSelectedImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </div>
                </div>
            }

            <input 
                id="rest-img"
                type="file" 
                accept='image/*' 
                onChange={onChange}
            />
        </FormItem>
    )
}

/**
 * WE USE A TRICK HERE:
 * "It's very simple. the Label element uses the "for" 
 * tag to reference to a form's element by id. In this 
 * case, we used "img" as the reference key between them. 
 * Once it is done, whenever you click on the label, it 
 * automatically trigger the form's element click event 
 * which is the file element click event in our case."
 * 
 * Ref: https://stackoverflow.com/questions/16001586/change-the-no-file-chosen
 */
