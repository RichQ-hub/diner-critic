
interface PriceRangeDropdownItemProps {
    value: number;
    handleChangePriceRange: (value: number) => void;
    handleDropdownOpen: () => void;
}

export default function PriceRangeDropdownItem(props: PriceRangeDropdownItemProps) {

    const { 
        value, 
        handleChangePriceRange, 
        handleDropdownOpen,
    } = props;

    return (
        <div 
            className='price-dropdown__item'
            onClick={() => {
                handleChangePriceRange(value);
                handleDropdownOpen();
            }}
        >
            {value}
        </div>
    )
}
