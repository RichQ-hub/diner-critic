import FormItem from '../FormItem/FormItem';

interface FormItemSelectProps {
    title: string;
    pageStyle: string;
    inputStyle: string;
    selectedItem: string;
    isDropdownOpen: boolean;
    handleDropdownOpen: () => void;
    dropdownMenu: React.ReactNode;
}

export default function FormItemSelect(props: FormItemSelectProps) {
    const { 
        title,
        pageStyle,
        inputStyle,
        selectedItem,
        isDropdownOpen,
        handleDropdownOpen,
        dropdownMenu 
    } = props;

    return (
        <FormItem title={title} pageStyle={pageStyle}>
            {/* Button */}
            <div className={`${inputStyle} ${isDropdownOpen ? 'dropdown--open' : ''}`} onClick={handleDropdownOpen}>
                <p>{selectedItem}</p>
            </div>

            {/* This returns the first falsy value, or the last one if all are true. So if 
            isMenuOpen is true, then we return DropdownMenu component. */}
            {isDropdownOpen && dropdownMenu}
        </FormItem>
    )
}
