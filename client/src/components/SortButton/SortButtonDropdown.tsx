import SortOptionItem from './SortOptionItem';

interface SortButtonDropdownProps {
    options: string[];
    handleChangeSortOption: (selectedOption: string) => void;
    handleToggleDropdown: () => void;
}

export default function SortButtonDropdown(props: SortButtonDropdownProps) {
    const { options, handleChangeSortOption, handleToggleDropdown } = props;

    return (
        <div className='sort-dropdown'>
            {options.map((opt, idx) => {
                return (
                    <SortOptionItem
                        key={idx}
                        option={opt}
                        handleChangeSortOption={handleChangeSortOption}
                        handleToggleDropdown={handleToggleDropdown}
                    />
                )
            })}
        </div>
    )
}
