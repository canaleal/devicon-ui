import ReactDOM from 'react-dom'
import './modal.css'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onNextPlaceholderText?: string
  onPrev: () => void
  onPrevPlaceholderText?: string
  children: React.ReactNode
}

const Modal = ({
  isOpen,
  onClose,
  onNext,
  onNextPlaceholderText,
  onPrev,
  onPrevPlaceholderText,
  children
}: ModalProps) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <section className='modal'>
      <div className='modal__container'>
        <button onClick={onPrev} className='modal__arrow-btn' title={onPrevPlaceholderText}>
          <i className='fas fa-chevron-left' />
        </button>
        <div className='modal__body'>
          <button className='modal__close-button' onClick={onClose}>
            <i className='fas fa-times' />
          </button>
          {children}
        </div>
        <button onClick={onNext} className='modal__arrow-btn' title={onNextPlaceholderText}>
          <i className='fas fa-chevron-right' />
        </button>
      </div>
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
