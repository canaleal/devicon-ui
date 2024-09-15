
import { TextBar } from '../../../../../components/Elements/Widgets/TextBar'
import { DEVICON_VERSION_RELEASE } from '../../../../../constants'
import { DeviconBranch } from '../../../../../types'

interface ModalFooterProps {
    altnames: string[]
    deviconBranch: DeviconBranch
}

const ModalFooter = ({ altnames, deviconBranch }: ModalFooterProps) => {
    return (
        <div className='alt-names-bar'>
            <TextBar title='Alt Names' content={altnames} />
            <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
        </div>
    )
}

export default ModalFooter