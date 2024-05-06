import { useEffect, useState } from 'react';
import { getPaginationButtons } from './helpers/paginationHelpers';

interface PaginationButtonsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const PaginationButtons = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationButtonsProps) => {
  const [pagesToRender, setPagesToRender] = useState<(string | number)[]>([]);

  useEffect(() => {
    setPagesToRender(getPaginationButtons(currentPage, totalPages));
  }, [currentPage, totalPages]);

  const BUTTON_STYLE = {
    base: 'px-4 py-2 rounded-md text-sm',
    active: 'bg-primary-600 text-white',
    hover: 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-dark-600',
    disabled: 'text-gray-400',
  };

  return (
    <div className="flex flex-row dark:text-white">
      <button
        className={`${BUTTON_STYLE.base} ${BUTTON_STYLE.hover} ${currentPage === 1 ? BUTTON_STYLE.disabled : ''}`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <i className="fa fa-arrow-left"></i>
      </button>

      {pagesToRender.map((page, idx) => {
        const isNumber = typeof page === 'number';
        const key = isNumber
          ? page
          : `${pagesToRender[idx - 1]}-${pagesToRender[idx + 1]}`;
        return isNumber ? (
          <button
            key={key}
            className={`${BUTTON_STYLE.base} ${page === currentPage ? BUTTON_STYLE.active : BUTTON_STYLE.hover}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={key}
            className={`${BUTTON_STYLE.base} ${BUTTON_STYLE.hover}`}
          >
            ...
          </span>
        );
      })}

      <button
        className={`${BUTTON_STYLE.base} ${BUTTON_STYLE.hover} ${currentPage === totalPages ? BUTTON_STYLE.disabled : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <i className="fa fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default PaginationButtons;
