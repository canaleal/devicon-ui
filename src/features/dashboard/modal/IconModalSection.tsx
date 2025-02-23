import { useEffect, useState } from 'react'
import Modal from '../../../components/Elements/Modal/Modal'
import useIconStore from '../../../store/iconStore'
import IconModal from './IconModal'
import { IIcon } from '../../../types'

const IconModalSection = () => {
  const { selectedIcon, filteredIcons, deviconBranch, setSelectedIcon } = useIconStore()

  const [nextIcon, setNextIcon] = useState<IIcon | null>(null)
  const [prevIcon, setPrevIcon] = useState<IIcon | null>(null)

  // Update next and previous icons whenever the selected icon changes
  useEffect(() => {
    if (!selectedIcon) {
      setNextIcon(null)
      setPrevIcon(null)
      return
    }

    const currentIndex = filteredIcons.findIndex(icon => icon === selectedIcon)

    // Set next icon, wrap around if needed
    const nextIndex = (currentIndex + 1) % filteredIcons.length
    setNextIcon(filteredIcons[nextIndex])

    // Set previous icon, wrap around if needed
    const prevIndex = (currentIndex - 1 + filteredIcons.length) % filteredIcons.length
    setPrevIcon(filteredIcons[prevIndex])

  }, [selectedIcon, filteredIcons])

  return (
    <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}  onNext={() => setSelectedIcon(nextIcon)}  onPrev={() => setSelectedIcon(prevIcon)} onNextPlaceholderText={nextIcon?.name} onPrevPlaceholderText={prevIcon?.name}>
      {selectedIcon && (
        <IconModal
          icon={selectedIcon}
          deviconBranch={deviconBranch}
        />
      )}
    </Modal>
  )
}

export default IconModalSection
