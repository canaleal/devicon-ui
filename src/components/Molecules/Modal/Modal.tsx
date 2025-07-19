import ReactDOM from 'react-dom'
import './modal.css'
import React from 'react'

export interface INavAction {
  fn?: () => void
  label?: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onNext?: INavAction
  onPrev?: INavAction
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, onNext, onPrev, children }: ModalProps) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <section className='modal'>
      {onPrev && (
        <button
          onClick={onPrev.fn}
          className='modal__arrow-btn'
          title={onPrev.label}
          aria-label={`Previous${onPrev.label ? `: ${onPrev.label}` : ''}`}
        >
          <i className='fas fa-chevron-left' />
        </button>
      )}
      <div className='modal__container'>

        <div className='modal__body'>
          <button className='modal__close-button' onClick={onClose} aria-label='Close modal'>
            <i className='fas fa-times' />
          </button>
          {children}
        </div>

      </div>
      {onNext && (
        <button
          onClick={onNext.fn}
          className='modal__arrow-btn'
          title={onNext.label}
          aria-label={`Next${onNext.label ? `: ${onNext.label}` : ''}`}
        >
          <i className='fas fa-chevron-right' />
        </button>
      )}
    </section>,
    document.getElementById('modal') as HTMLElement
  )
}
