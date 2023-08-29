import './SortButton.css';
import { useToggleDropdown } from '../../hooks/useToggleDropdown';
import SortButtonDropdown from './SortButtonDropdown';

interface SortButtonProps {
    options: string[];
    selectedSortOption: string;
    handleChangeSortOption: (selectedOption: string) => void;
}

export default function SortButton(props: SortButtonProps) {
    const { options, selectedSortOption, handleChangeSortOption } = props;

    const { isOpen, handleToggle } = useToggleDropdown(false);

    return (
        <div className='sort-btn' onClick={handleToggle}>
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
