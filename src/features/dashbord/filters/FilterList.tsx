import { IIconFilter, IIconFilterGroup } from "./types";

interface FilterListProps {
  title: string;
  filterGroup: IIconFilterGroup;
  iconMap: { [key: string]: string };
  isLimited: boolean;
  handleFilter: (filter: IIconFilter) => void;
  resetFilterGroup?: () => void;
}

export const FilterList = ({ title, filterGroup, iconMap, isLimited, handleFilter, resetFilterGroup }: FilterListProps) => {
  const selectedFiltersCount = filterGroup.filters.reduce((count, filter) => (filter.isSelected ? count + 1 : count), 0);
  const isSelectedClass = (filter: IIconFilter) =>
    filter.isSelected
      ? "bg-primary hover:bg-primary-dark text-white dark:bg-zinc-1000 dark:hover:bg-zinc-800 shadow-sm"
      : "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:shadow-sm";

  return (
    <div className="flex flex-col text-gray-800 dark:text-gray-200">
      <div className="flex flex-row gap-2 mb-2 dark:text-white pr-4">
        <p className="font-bold text-md ">{title}</p>
        <p className="text-sm my-auto">
          ({selectedFiltersCount} / {filterGroup.filters.length})
        </p>

        {resetFilterGroup && (
          <button className={`ml-auto text-sm font-bold ${selectedFiltersCount ? 'text-primary hover:text-primary-dark' : 'hidden'} `} onClick={resetFilterGroup}>
            Reset
          </button>
        )}
      </div>
      <div className={`flex flex-col gap-2 overflow-y-auto ${isLimited ? 'h-[30rem]' : 'h-fit'} pr-2`}>
        {filterGroup.filters.map((filter, index) => (
          <button
            key={index}
            className={`${isSelectedClass(filter)} rounded-md flex px-4 py-2 text-sm`}
            onClick={() => handleFilter(filter)}
          >
            <i className={`${iconMap[filter.filterName] ?? 'fa-solid fa-square'} my-auto`} />
            <p className="ml-2">{filter.filterName}</p>
            <p className="ml-auto">{filter.numberOfIcons}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
