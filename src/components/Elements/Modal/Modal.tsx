import ReactDOM from 'react-dom'
import { MODAL_STYLES } from './ModalStyles'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className={`${MODAL_STYLES.backgroundBase}`}>
      <div className={`${MODAL_STYLES.modalBase} ${MODAL_STYLES.modalLight} ${MODAL_STYLES.modalDark}`}>
        <button className={`${MODAL_STYLES.closeButton} ${MODAL_STYLES.closeButtonLight}`} onClick={onClose}>
          <i className='fas fa-times' />
        </button>
        {children}
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
