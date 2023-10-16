import { useEffect, useState } from 'react';
import { DeviconBranch, IIcon } from '../../types';
import PaginationCard from './widgets/PaginationCard';
import PaginationButtons from './widgets/PaginationButtons';
import PaginationSelection from './widgets/PaginationSelection';

interface PaginatedGridProps {
  icons: IIcon[];
  deviconBranch: DeviconBranch;
  onSelect: (icon: IIcon) => void;
}

const PaginatedGrid = ({ icons, onSelect, deviconBranch }: PaginatedGridProps) => {
  
  const [paginatedIcons, setPaginatedIcons] = useState<IIcon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const elementsPerPageOptions = [48, 72, 96];
  const [elementsPerPage, setElementsPerPage] = useState<number>(elementsPerPageOptions[0]);
  const totalPages = Math.ceil(icons.length / elementsPerPage);

  const handleIconsPerPageChange = (elementsPerPage: number) => {
    if(!elementsPerPage) return;
    setElementsPerPage(elementsPerPage);
    setCurrentPage(1);
  };

  const paginateIcons = () => {
    const startIndex = (currentPage - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    setPaginatedIcons(icons.slice(startIndex, endIndex));
  }

  useEffect(() => {
    setCurrentPage(1);
    paginateIcons();
  }, [icons]);

  useEffect(() => {
    paginateIcons();
  }, [currentPage, elementsPerPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full justify-between dark:text-white">
        <p className="font-bold text-xl my-auto">{icons.length} Icons</p>
        <p>Page {currentPage} of {totalPages || 1}</p>
      </div>


      {paginatedIcons.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-6">
          {paginatedIcons.map((icon) => (
            <PaginationCard key={icon.name} icon={icon} onSelect={onSelect} deviconBranch={deviconBranch} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-500">No icons found</p>
          <p className="text-gray-500">Try a different search term or change filters</p>
        </div>
      )}

      <div className="flex flex-row justify-between mt-6 ">
        <PaginationSelection elementsPerPage={elementsPerPage} currentPage={currentPage} totalElements={icons.length} elementsPerPageOptions={elementsPerPageOptions} handlePerPageChange={handleIconsPerPageChange} />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PaginatedGrid;
