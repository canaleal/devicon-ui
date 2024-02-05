interface FilterHeaderProps {
    categoryName: string;
    numberOfActiveFilters: number;
    totalFilters: number;
    resetFilterGroup?: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ categoryName, numberOfActiveFilters, totalFilters, resetFilterGroup }) => (
    <div className="flex flex-row gap-2 mb-2 dark:text-white pr-4">
        <p className="font-bold text-md">{categoryName}</p>
        <p className="text-sm my-auto">
            ({numberOfActiveFilters} / {totalFilters})
        </p>
        {resetFilterGroup && (
            <button
                className={`ml-auto text-sm font-bold ${numberOfActiveFilters ? 'text-primary hover:text-primary-dark' : 'hidden'}`}
                onClick={resetFilterGroup}
            >
                Reset
            </button>
        )}
    </div>
);

export default FilterHeader;