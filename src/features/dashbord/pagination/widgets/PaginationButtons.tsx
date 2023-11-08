import { useEffect, useState } from "react";

interface PaginationButtonsProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
    const [pagesToRender, setPagesToRender] = useState<(number | '...')[]>([]);

    useEffect(() => {
        const getRange = (start: number, end: number) => {
            const range: number[] = [];
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            return range;
        };
    
        // Initial and final pages
        const pages: (number | '...')[] = [1];
    
        // Determine the start and end range around the current page.
        const startRange = Math.max(2, currentPage - 2);
        const endRange = Math.min(totalPages - 1, currentPage + 2);
    
        // Add "..." or the range around the current page
        if (startRange > 2) pages.push('...');
        pages.push(...getRange(startRange, endRange));
        if (endRange < totalPages - 1) pages.push('...');
    
        // Push the last page if necessary
        if (totalPages > 1) pages.push(totalPages);
    
        setPagesToRender(pages);
    }, [currentPage, totalPages]);
    

    return (
        <div className="flex flex-row dark:text-white">

            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === 1 ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-zinc-900'}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage-1)}
            >
                <i className="fa fa-arrow-left"></i>
            </button>

            {pagesToRender.map((page, idx) => {
                const isNumber = typeof page === "number";
                const key = isNumber ? page : `${pagesToRender[idx - 1]}-${pagesToRender[idx + 1]}`;
                return isNumber ? (
                    <button key={key} className={`px-4 py-2 rounded-md text-sm ${page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-zinc-900'}`} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ) : (
                    <span key={key} className="px-4 py-2 rounded-md text-sm">...</span>
                );
            })}


            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === totalPages ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-zinc-900'}`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage+1)}
            >
                <i className="fa fa-arrow-right"></i>
            </button>
        </div>


    );

};

export default PaginationButtons;
