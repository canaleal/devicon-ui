import { IIconFilter } from "../types";

interface FilterListProps {
  title: string,
  categories: IIconFilter[],
  iconMap: { [key: string]: string },
  limit?: number,
  handleFilter: (category: IIconFilter) => void
}

const FilterList = ({ title, categories, iconMap, limit, handleFilter }: FilterListProps) => {
  return (
    <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-200 ">
      <p className="font-bold text-md  mb-2 dark:text-white ">{title}</p>
      {categories.slice(0, limit || categories.length).map((category, index) => (
        <button
          key={index}
          className={`${category.isSelected ? "bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-700 shadow-sm" : " hover:bg-gray-50  dark:hover:bg-zinc-700 hover:shadow-sm"}  rounded-md flex px-4 py-2 text-sm`}
          onClick={() => handleFilter(category)}
        >
          <i className={iconMap[category.filterNme] ?? 'fa-solid fa-square'} />
          <p className="ml-2">{category.filterNme}</p>
          <p className="ml-auto">{category.numberOfIcons}</p>
        </button>
      ))}
    </div>
  );
}

export default FilterList;