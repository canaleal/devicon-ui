import ReactDOM from 'react-dom'

const MODAL_STYLES = {
  background:
    'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 max-w-screen max-h-screen overflow-auto',
  container: 'relative p-8 w-11/12 md:w-5/6 lg:w-5/6 ',
  colors: 'bg-white  rounded-md overflow-hidden  dark:bg-dark-900 dark:text-smoke-100',
  closeButton: 'absolute top-0 right-0 p-4 text-2xl leading-none   transition-colors   rounded-bl-md',
  closeButtonColors: 'bg-frog-700 hover:bg-frog-800  text-white'
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className={`${MODAL_STYLES.background}`}>
      <div className={`${MODAL_STYLES.container} ${MODAL_STYLES.colors}`}>
        <button className={`${MODAL_STYLES.closeButton} ${MODAL_STYLES.closeButtonColors}`} onClick={onClose}>
          <i className='fas fa-times' />
        </button>
        {children}
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
