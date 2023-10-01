import { ICategory } from "../types";

interface CategoryListProps {
  title: string,
  categories: ICategory[],
  classes?: string
}

const CategoryList: React.FC<CategoryListProps> = ({ title, categories, classes }) => {
  return (
    <div className={`flex flex-col ${classes}`}>
      <p className="text-subtitle mb-2">{title}</p>
      {categories.map((category, index) => (
        <button
          key={index}
          className="hover:bg-white hover:shadow-sm text-gray-600 rounded-md flex justify-between px-4 py-2 text-sm"
        >
          <p>{category.versionType}</p>
          <p>{category.numberOfIcons}</p>
        </button>
      ))}
    </div>
  );
}

export default CategoryList;