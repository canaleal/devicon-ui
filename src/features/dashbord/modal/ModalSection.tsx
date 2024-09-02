import Modal from "../../../components/Elements/Modal/Modal"
import useIconStore from "../../../store/iconStore"
import IconModal from "./IconModal"
import "../../../components/Layout/Container/container.css"

const ModalSection = () => {
  const { selectedIcon, deviconBranch, setSelectedIcon } = useIconStore()

  return (
    <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}>
      {selectedIcon && <IconModal icon={selectedIcon} deviconBranch={deviconBranch} />}
    </Modal>
  )
}

export default ModalSection
