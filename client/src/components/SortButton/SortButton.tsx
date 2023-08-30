import './SortButton.css';
import { useToggleDropdown } from '../../hooks/useToggleDropdown';
import SortButtonDropdown from './SortButtonDropdown';

interface SortButtonProps {
    styleClassname: string;
    options: string[];
    selectedSortOption: string;
    handleChangeSortOption: (selectedOption: string) => void;
}

export default function SortButton(props: SortButtonProps) {
    const { styleClassname, options, selectedSortOption, handleChangeSortOption } = props;

    const { isOpen, handleToggle } = useToggleDropdown(false);

    return (
        <div className={styleClassname} onClick={handleToggle}>
            <p>{selectedSortOption}</p>

            {
                isOpen && 
                <SortButtonDropdown
                    options={options}
                    handleChangeSortOption={handleChangeSortOption}
                    handleToggleDropdown={handleToggle}
                />
            }
        </div>
    )
}
