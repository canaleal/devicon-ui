import { DeviconBranch, IIcon } from "../../../../types";
import { createDeviconIconUrl } from "../../../../helpers/iconUrl";

interface PaginationCardProps {
  icon: IIcon;
  deviconBranch: DeviconBranch;
  onSelect: (icon: IIcon) => void;
}

const cardClasses = {
  base: "flex flex-col justify-center align-middle h-[10rem] text-center rounded-lg w-full overflow-hidden relative shadow-sm",
  border: "border dark:border-zinc-600",
  color: "bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white",
};

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch);

  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={`Select icon: ${icon.name}`}
      className={`${cardClasses.base} ${cardClasses.border} ${cardClasses.color}`}
    >
      <img className="mx-auto" width={50} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className="text-sm mt-4 dark:text-white">{icon.name}</p>

      {icon.versions.svg.length > 4 && (
        <div className="absolute top-0 right-0 bg-green-600 text-white p-2 rounded-bl-lg">
          <p className="text-sm">{icon.versions.svg.length}</p>
        </div>
      )}
    </button>

  );
};

export default PaginationCard;
