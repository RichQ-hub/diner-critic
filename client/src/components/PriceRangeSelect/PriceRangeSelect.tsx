import React from 'react'
import FormItemSelect from '../FormItemSelect/FormItemSelect'
import PriceRangeDropdown from './PriceRangeDropdown';
import { useToggleDropdown } from '../../hooks/useToggleDropdown';

interface PriceRangeSelectProps {
    selectedItem: string;
    handleChangePriceRange: (value: number) => void;
    pageStyle: string;
    inputStyle: string;
}

export default function PriceRangeSelect(props: PriceRangeSelectProps) {
    const {
        handleChangePriceRange, 
        selectedItem,
        pageStyle,
        inputStyle
    } = props; 

    const { isOpen, handleToggle } = useToggleDropdown(false);

    return (
        <FormItemSelect 
            title='Price Range'
            pageStyle={pageStyle}
            inputStyle={inputStyle}
            selectedItem={selectedItem}
            isDropdownOpen={isOpen}
            handleDropdownOpen={handleToggle}
            dropdownMenu={
                <PriceRangeDropdown 
                    handleChangePriceRange={handleChangePriceRange}
                    handleDropdownOpen={handleToggle}
                />
            }
        />
    )
}
