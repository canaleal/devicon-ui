import { useEffect, useState } from 'react';
import { DeviconBranch, IIcon } from '../../types';
import IconCard from './IconCard';
import PaginationButtons from './PaginationButtons';
import PaginationSelection from './PaginationSelection';

interface PaginatedGridProps {
  icons: IIcon[];
  deviconBranch: DeviconBranch;
  onSelect: (icon: IIcon) => void;
}

const PaginatedGrid: React.FC<PaginatedGridProps> = ({ icons, onSelect, deviconBranch }) => {
  const [paginatedIcons, setPaginatedIcons] = useState<IIcon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [iconsPerPage, setIconsPerPage] = useState<number>(48);
  const totalPages = Math.ceil(icons.length / iconsPerPage);

  const handleIconsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIconsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginateIcons = () => {
    const startIndex = (currentPage - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;
    setPaginatedIcons(icons.slice(startIndex, endIndex));
  }

  useEffect(() => {
    setCurrentPage(1);
    paginateIcons();
  }, [icons]);

  useEffect(() => {
    paginateIcons();
  }, [currentPage, iconsPerPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full justify-between dark:text-white">
        <p className="font-bold text-xl my-auto">{icons.length} Icons</p>
        <p>Page {currentPage} of {totalPages || 1}</p>
      </div>


      {paginatedIcons.length ? (
        <div className="grid xl:grid-cols-8 gap-4 mt-6">
          {paginatedIcons.map((icon) => (
            <IconCard key={icon.name} icon={icon} onSelect={onSelect} deviconBranch={deviconBranch} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-500">No icons found</p>
          <p className="text-gray-500">Try a different search term or change filters</p>
        </div>
      )}

      <div className="flex flex-row justify-between mt-6 ">
        <PaginationSelection iconsPerPage={iconsPerPage} currentPage={currentPage} totalIcons={icons.length} handleIconsPerPageChange={handleIconsPerPageChange} />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PaginatedGrid;
