import { TextBar } from '../../../../../components/Atoms/TextBar'
import { DEVICON_VERSION_RELEASE } from '../../../../../constants'
import { DeviconBranch, IIcon } from '../../../../../types'

interface ModalFooterProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

const ModalFooter = ({ icon, deviconBranch }: ModalFooterProps) => {
  return (
    <div className='alt-names-bar'>
      <TextBar extraClasses='hidden lg:inline-flex' title='Tags' content={icon.tags} />
      <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
    </div>
  )
}

export default ModalFooter
