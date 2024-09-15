import { Tooltip } from "../../../../../components/Elements/Widgets/Tooltip";
import { copyToClipboard } from "../../../../../helpers/copyToClipboard";

const ModalHeader = ({ iconName }: { iconName: string }) => (
    <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
      <button onClick={() => copyToClipboard(iconName)} className='button button--icon'>
        <p className='icon-title'>{iconName}</p>
        <i className='fa-solid fa-copy text-xl'></i>
      </button>
    </Tooltip>
  );
  
export default ModalHeader;