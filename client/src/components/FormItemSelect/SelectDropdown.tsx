import React from 'react';
import SelectDropdownItem from './SelectDropdownItem';

const NUM_PRICES = 5;

export default function SelectDropdown() {

    return (
        <div className='create-form-select__dropdown'>
            {[...Array(NUM_PRICES + 1).keys()].slice(1).map((num, idx) => {
                return (
                    <SelectDropdownItem 
                        key={idx}
                        value={num}
                    />
                )
            })}
        </div>
    )
}
