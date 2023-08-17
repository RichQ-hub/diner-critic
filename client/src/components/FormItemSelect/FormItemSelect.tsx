import { useState } from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemSelectProps {
    title: string;
    selectedItem: string;
    isDropdownOpen: boolean;
    handleDropdownOpen: () => void;
    dropdownMenu: React.ReactNode;
}

export default function FormItemSelect(props: FormItemSelectProps) {
    const { 
        title, 
        selectedItem,
        isDropdownOpen,
        handleDropdownOpen,
        dropdownMenu 
    } = props;

    return (
        <FormItem title={title}>
            <button className='create-form-select input--bg' onClick={handleDropdownOpen}>
                <p>{selectedItem}</p>
            </button>

            {/* This returns the first falsy value, or the last one if all are true. So if 
            isMenuOpen is true, then we return DropdownMenu component. */}
            {isDropdownOpen && dropdownMenu}
        </FormItem>
    )
}
