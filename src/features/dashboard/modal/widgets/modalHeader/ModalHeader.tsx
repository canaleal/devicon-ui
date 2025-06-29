import { Tooltip } from '../../../../../components/Atoms/Tooltip'
import { copyToClipboard } from '../../../../../helpers/copyToClipboard'

const ModalHeader = ({ iconName }: { iconName: string }) => (
  <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
    <button onClick={() => copyToClipboard(iconName)} className='button button--icon'>
      <i className='fa-solid fa-copy text-xl'></i>
      <p className='icon-title'>{iconName}</p>
    </button>
  </Tooltip>
)

export default ModalHeader
