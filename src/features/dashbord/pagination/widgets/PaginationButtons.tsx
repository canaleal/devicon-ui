import { useEffect, useState } from "react";
import { getPaginationButtons } from "./helpers/paginationHelpers";

interface PaginationButtonsProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
    const [pagesToRender, setPagesToRender] = useState<(string | number)[]>([]);

    useEffect(() => {
        setPagesToRender(getPaginationButtons(currentPage, totalPages));
    }, [currentPage, totalPages]);
    

    return (
        <div className="flex flex-row dark:text-white">

            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === 1 ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-dark-600'}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage-1)}
            >
                <i className="fa fa-arrow-left"></i>
            </button>

            {pagesToRender.map((page, idx) => {
                const isNumber = typeof page === "number";
                const key = isNumber ? page : `${pagesToRender[idx - 1]}-${pagesToRender[idx + 1]}`;
                return isNumber ? (
                    <button key={key} className={`px-4 py-2 rounded-md text-sm ${page === currentPage ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-dark-600'}`} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ) : (
                    <span key={key} className="px-4 py-2 rounded-md text-sm">...</span>
                );
            })}


            <button
                className={`px-4 py-2 rounded-md text-sm ${currentPage === totalPages ? 'text-gray-400': 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-dark-600'}`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage+1)}
            >
                <i className="fa fa-arrow-right"></i>
            </button>
        </div>


    );

};

export default PaginationButtons;
