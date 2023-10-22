import { IIconFilter } from "./types";

interface FilterListProps {
  title: string;
  filters: IIconFilter[];
  iconMap: { [key: string]: string };
  limit?: number;
  handleFilter: (category: IIconFilter) => void;
}

export const FilterList = ({ title, filters, iconMap, limit, handleFilter }: FilterListProps) => {
  const selectedFiltersCount = filters.reduce((count, filter) => (filter.isSelected ? count + 1 : count), 0);
  const isSelectedClass = (filter: IIconFilter) =>
    filter.isSelected
      ? "bg-green-600 hover:bg-green-700 text-white dark:bg-zinc-900 dark:hover:bg-zinc-700 shadow-sm"
      : "hover:bg-gray-50 dark:hover:bg-zinc-700 hover:shadow-sm";

  return (
    <div className="flex flex-col text-gray-800 dark:text-gray-200">
      <div className="flex flex-row gap-2 mb-2 dark:text-white">
        <p className="font-bold text-md ">{title}</p>
        <p className="text-sm my-auto">
          ({selectedFiltersCount} / {filters.length})
        </p>
      </div>
      <div className={`flex flex-col gap-2 overflow-y-auto ${limit ? 'h-96' : 'h-fit'} pr-2`}>
        {filters.map((filter, index) => (
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
