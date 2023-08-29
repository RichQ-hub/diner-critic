import PriceRangeDropdownItem from './PriceRangeDropdownItem';

const NUM_ITEMS = 5;

interface PriceRangeDropdownProps {
    handleChangePriceRange: (value: number) => void;
    handleDropdownOpen: () => void;
}

export default function PriceRangeDropdown(props: PriceRangeDropdownProps) {
    const { 
        handleChangePriceRange,
        handleDropdownOpen
    } = props; 

    return (
        <div className='price-dropdown'>
            {/* Creates an array [1,2,3,4,5] */}
            {[...Array(NUM_ITEMS + 1).keys()].slice(1).map((price: number, idx) => {
                return (
                    <PriceRangeDropdownItem
                        key={idx}
                        value={price}
                        handleChangePriceRange={handleChangePriceRange}
                        handleDropdownOpen={handleDropdownOpen}
                    />
                )
            })}
        </div>
    )
}
