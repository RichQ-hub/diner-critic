interface SortOptionItemProps {
    option: string;
    handleChangeSortOption: (selectedOption: string) => void;
    handleToggleDropdown: () => void;
}

export default function SortOptionItem(props: SortOptionItemProps) {

    const { option, handleChangeSortOption, handleToggleDropdown } = props;

    return (
        <div
            className='sort-option__item'
            onClick={() => {
                handleChangeSortOption(option);
                handleToggleDropdown();
            }}
        >
            {option}
        </div>
    )
}
