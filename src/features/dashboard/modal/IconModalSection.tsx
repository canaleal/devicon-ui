import { useEffect, useState } from 'react'
import Modal from '../../../components/Molecules/Modal/Modal'
import useIconStore from '../../../store/iconStore'
import IconModal from './IconModal'
import { IIcon } from '../../../types'

const IconModalSection = () => {
  const { selectedIcon, filteredIcons, deviconBranch, setSelectedIcon } = useIconStore()
  const [nextIcon, setNextIcon] = useState<IIcon | null>(null)
  const [prevIcon, setPrevIcon] = useState<IIcon | null>(null)

  useEffect(() => {
    if (!selectedIcon || filteredIcons.length === 0) {
      setNextIcon(null)
      setPrevIcon(null)
      return
    }

    const currentIndex = filteredIcons.findIndex((icon) => icon === selectedIcon)
    if (currentIndex === -1) return

    const getWrappedIndex = (index: number) => (index + filteredIcons.length) % filteredIcons.length

    setNextIcon(filteredIcons[getWrappedIndex(currentIndex + 1)])
    setPrevIcon(filteredIcons[getWrappedIndex(currentIndex - 1)])
  }, [selectedIcon, filteredIcons])

  if (!selectedIcon) return null

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedIcon(null)}
      onNext={() => nextIcon && setSelectedIcon(nextIcon)}
      onPrev={() => prevIcon && setSelectedIcon(prevIcon)}
      onNextPlaceholderText={nextIcon?.name}
      onPrevPlaceholderText={prevIcon?.name}
    >
      <IconModal icon={selectedIcon} deviconBranch={deviconBranch} />
    </Modal>
  )
}

export default IconModalSection
