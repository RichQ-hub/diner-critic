import React from 'react'

interface SelectDropdownItemProps {
    value: number;
}

export default function SelectDropdownItem(props: SelectDropdownItemProps) {
    const { value } = props;
    return (
        <div className='create-form-select__dropdown-item'> 
            {"$".repeat(value)}
        </div>
    )
}
