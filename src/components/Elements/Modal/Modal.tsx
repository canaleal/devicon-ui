import ReactDOM from 'react-dom'
import './modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, onNext, onPrev, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className='modal'>
      <div className='modal__container'>
        {onPrev && <button onClick={onPrev} className='modal__arrow-btn'>
          <i className='fas fa-chevron-left' />
        </button>}
        <div className='modal__body'>
          <button className='modal__close-button' onClick={onClose}>
            <i className='fas fa-times' />
          </button>
          {children}
        </div>
        {onNext && <button onClick={onNext} className='modal__arrow-btn'>
          <i className='fas fa-chevron-right' />
        </button>}
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
