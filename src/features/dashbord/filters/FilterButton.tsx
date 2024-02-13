import { IIconFilterOption } from "./types";

interface FilterButtonProps {
    filter: IIconFilterOption;
    icon: string;
    handleFilter: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ filter, icon, handleFilter }) => {

    const isSelectedClass = filter.isSelected
            ? "bg-indigo-600 hover:bg-indigo-800 text-white dark:bg-zinc-1000 dark:hover:bg-zinc-800 shadow-sm"
            : "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:shadow-sm";

    return (

        <button className={`${isSelectedClass} rounded-md flex px-4 py-2 text-sm`} onClick={handleFilter}>
            <i className={`${icon} my-auto`} />
            <p className="ml-2">{filter.filterName}</p>
            <p className="ml-auto">{filter.numberOfIcons}</p>
        </button>
    )
};

export default FilterButton;