interface FilterHeaderProps {
  categoryName: string;
  numberOfActiveFilters: number;
  totalFilters: number;
  resetFilterGroup?: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  categoryName,
  numberOfActiveFilters,
  totalFilters,
  resetFilterGroup,
}) => (
  <div className="flex flex-row gap-2 mb-2 dark:text-white pr-4 items-center">
    <p className="font-bold text-lg">{categoryName}</p>
    <p className="text-sm">
      ({numberOfActiveFilters} / {totalFilters})
    </p>
    {resetFilterGroup && (
      <button
        className={`ml-auto text-sm font-bold ${numberOfActiveFilters ? 'text-primary-600 hover:text-primary-800' : 'hidden'}`}
        onClick={resetFilterGroup}
      >
        <i className="fas fa-undo-alt text-lg" />
      </button>
    )}
  </div>
);

export default FilterHeader;
