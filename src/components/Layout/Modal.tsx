



interface ModalProps {
    handleClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ handleClose, children }: ModalProps) => {
    return (
        <section className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-600 bg-opacity-50">
            <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 w-11/12 md:w-5/6 lg:w-4/6">
                <button
                    className="absolute top-0 right-0 bg-zinc-900 hover:bg-zinc-800 text-white p-4 text-4xl leading-none rounded-bl-lg rounded-tr-lg"
                    onClick={handleClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </section>
    )
}

export default Modal