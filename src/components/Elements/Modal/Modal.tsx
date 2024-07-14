import ReactDOM from 'react-dom'
import './styles/modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className="modal">
      <div className="modal__container">
        <button className="modal__close-button" onClick={onClose}>
          <i className='fas fa-times' />
        </button>
        {children}
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
