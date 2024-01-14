
import ReactDOM from "react-dom"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <section className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-1000 bg-opacity-50">
            <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 w-11/12 md:w-5/6 lg:w-4/6">
                <button
                    className="absolute top-0 right-0 bg-zinc-1000 hover:bg-zinc-900 text-white p-4 text-4xl leading-none rounded-bl-lg rounded-tr-lg"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </section>,
        document.getElementById('modal') as HTMLElement
    )
}

export default Modal