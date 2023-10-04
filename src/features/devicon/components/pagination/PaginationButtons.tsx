import { useEffect, useState } from "react";

interface PaginationButtonsProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
    const [pagesToRender, setPagesToRender] = useState<(number | '...')[]>([]);

    useEffect(() => {
        const pages: (number | '...')[] = [];

        // Determine the start and end range around the current page.
        const startRange = Math.max(2, currentPage - 2);
        const endRange = Math.min(totalPages - 1, currentPage + 2);

        // Push initial page
        pages.push(1);

        // Check and push the "..." before the current range
        if (startRange > 2) {
            pages.push('...');
        }

        // Push the range around the current page
        for (let i = startRange; i <= endRange; i++) {
            pages.push(i);
        }

        // Check and push the "..." after the current range
        if (endRange < totalPages - 1) {
            pages.push('...');
        }

        // Push the last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        setPagesToRender(pages);
    }, [currentPage, totalPages]);


    return (
        <>

            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === 1 ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm'}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
            >
                <i className="fa fa-arrow-left"></i>
            </button>

            {pagesToRender.map((page, idx) => {
                const isNumber = typeof page === "number";
                const key = isNumber ? page : `${pagesToRender[idx - 1]}-${pagesToRender[idx + 1]}`;
                return isNumber ? (
                    <button key={key} className={`${page === currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-200 hover:shadow-sm'} px-4 py-2 rounded-md text-sm`} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ) : (
                    <span key={key} className="px-4 py-2 rounded-md text-sm">...</span>
                );
            })}


            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === totalPages ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm'}`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
            >
                <i className="fa fa-arrow-right"></i>
            </button>
        </>


    );

};

export default PaginationButtons;
