import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90'>
      <div className='relative bg-white  rounded-lg shadow-lg p-8 w-11/12 md:w-5/6 lg:w-5/6 '>
        <button className='absolute top-0 right-0 p-4 text-4xl leading-none rounded-bl-lg bg-frog-700 hover:bg-frog-800 text-smoke-100 transition-colors' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
