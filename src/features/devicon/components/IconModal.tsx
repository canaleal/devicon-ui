

// Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
   
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
                <button
                    className="absolute top-2 right-2 text-4xl leading-none hover:text-gray-600"
                    onClick={onClose}
                >
                    &times;
                </button>


                {children}


            </div>
        </div>
    );
}

export default Modal;
