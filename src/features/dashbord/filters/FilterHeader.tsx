interface FilterHeaderProps {
    categoryName: string;
    numberOfActiveFilters: number;
    totalFilters: number;
    resetFilterGroup?: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ categoryName, numberOfActiveFilters, totalFilters, resetFilterGroup }) => (
    <div className="flex flex-row gap-2 mb-2 dark:text-white pr-4">
        <p className="font-bold text-lg my-auto">{categoryName}</p>
        <p className="text-sm my-auto">
            ({numberOfActiveFilters} / {totalFilters})
        </p>
        {resetFilterGroup && (
            <button
                className={`ml-auto text-sm font-bold ${numberOfActiveFilters ? 'text-green-600 hover:text-green-800' : 'hidden'}`}
                onClick={resetFilterGroup}
            >
                <i className="fas fa-undo-alt text-lg" />
            </button>
        )}
    </div>
);

export default FilterHeader;