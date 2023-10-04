import { ICategory } from "../types";

interface CategoryListProps {
  title: string,
  categories: ICategory[],
  iconMap: { [key: string]: string },
  limit?: number,
  handleFilter: (category: ICategory) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ title, categories, iconMap, limit, handleFilter }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-md  mb-2">{title}</p>
      {categories.slice(0, limit || categories.length).map((category, index) => (
        <button
          key={index}
          className={`${category.isSelected? "bg-white hover:bg-gray-50 shadow-sm": "hover:bg-gray-200 hover:shadow-sm"}  text-gray-600 rounded-md flex px-4 py-2 text-sm`}
          onClick={() => handleFilter(category)}
        >
          <i className={iconMap[category.categoryName] ?? 'fa-solid fa-square'} />
          <p className="ml-2">{category.categoryName}</p>
          <p className="ml-auto">{category.numberOfIcons}</p>
        </button>
      ))}
    </div>
  );
}

export default CategoryList;