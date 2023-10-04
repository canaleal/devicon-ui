import { ICategory, versionIconMap } from "../types";

interface CategoryListProps {
  title: string,
  categories: ICategory[],
  handleFilter: (category: ICategory) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ title, categories, handleFilter }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-md  mb-2">{title}</p>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`${category.isSelected? "bg-white hover:bg-gray-50 shadow-sm": "hover:bg-gray-200 hover:shadow-sm"}  text-gray-600 rounded-md flex px-4 py-2 text-sm`}
          onClick={() => handleFilter(category)}
        >
          <i className={versionIconMap[category.versionName]} />
          <p className="ml-2">{category.versionName}</p>
          <p className="ml-auto">{category.numberOfIcons}</p>
        </button>
      ))}
    </div>
  );
}

export default CategoryList;