import { useEffect, useState } from 'react';
import { DeviconBranch, IIcon } from '../types';
import IconCard from './IconCard';

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;
    setPaginatedIcons(icons.slice(startIndex, endIndex));
  }, [icons, currentPage, iconsPerPage]);

  const pageButtons = Array.from({ length: totalPages }).map((_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={pageNumber}
        className={`${
          pageNumber === currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-200 hover:shadow-sm'
        } px-4 py-2 rounded-md text-sm`}
        onClick={() => setCurrentPage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="flex w-full mb-6 justify-between">
        <p className="font-bold text-xl my-auto">{icons.length} Icons</p>
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      <div className="grid xl:grid-cols-6 gap-4">
        {paginatedIcons.map((icon) => (
          <IconCard key={icon.name} icon={icon} onSelect={onSelect} deviconBranch={deviconBranch} />
        ))}
      </div>

      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-row">
          <p className="my-auto">Items Per Page</p>
          <select value={iconsPerPage} onChange={handleIconsPerPageChange} className="ml-2 bg-white border rounded-lg px-2 py-2">
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={72}>72</option>
            <option value={96}>96</option>
          </select>
          <p className="ml-4 my-auto">
            {(currentPage - 1) * iconsPerPage + 1}-{Math.min(currentPage * iconsPerPage, icons.length)} of {icons.length} icons
          </p>
        </div>
        <div className="flex flex-row">{pageButtons}</div>
      </div>
    </div>
  );
};

export default PaginatedGrid;
