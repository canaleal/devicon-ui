import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const MODAL_STYLES = {
  base: 'fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90',
  modal: 'relative bg-white  rounded-lg shadow-lg p-8 w-11/12 md:w-5/6 lg:w-5/6',
  closeButton: 'absolute top-0 right-0 p-4 text-2xl leading-none rounded-bl-lg rounded-tr-lg transition-colors',
  closeButtonLight: 'bg-frog-700 hover:bg-frog-800 text-smoke-100 shadow-md'
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className={`${MODAL_STYLES.base}`}>
      <div className={`${MODAL_STYLES.modal}`}>
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
