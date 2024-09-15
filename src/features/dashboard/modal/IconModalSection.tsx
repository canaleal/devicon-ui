import Modal from "../../../components/Elements/Modal/Modal"
import useIconStore from "../../../store/iconStore"
import IconModal from "./IconModal"

const IconModalSection = () => {
  const { selectedIcon, deviconBranch, setSelectedIcon } = useIconStore()

  return (
    <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}>
      {selectedIcon && <IconModal icon={selectedIcon} deviconBranch={deviconBranch} />}
    </Modal>
  )
}

export default IconModalSection
