import { useEffect, useState } from 'react'
import { Modal, INavAction } from '../../../components/Molecules/Modal/Modal'
import { IconModal } from './IconModal'
import { DeviconBranch, IIcon } from '../../../types'

interface IconModalSectionProps {
  selectedIcon: IIcon
  filteredIcons: IIcon[]
  deviconBranch: DeviconBranch
  setSelectedIcon: (selectedIcon: IIcon | null) => void
}

const IconModalSection = ({ selectedIcon, filteredIcons, deviconBranch, setSelectedIcon }: IconModalSectionProps) => {
  const [navIcons, setNavIcons] = useState<{
    next?: INavAction
    prev?: INavAction
  }>({})

  useEffect(() => {
    if (!selectedIcon || filteredIcons.length === 1) {
      setNavIcons({})
      return
    }

    const currentIndex = filteredIcons.findIndex((icon) => icon === selectedIcon)
    if (currentIndex === -1) return

    const getWrappedIndex = (index: number) => (index + filteredIcons.length) % filteredIcons.length

    const next = filteredIcons[getWrappedIndex(currentIndex + 1)]
    const prev = filteredIcons[getWrappedIndex(currentIndex - 1)]

    setNavIcons({
      next: next ? { fn: () => setSelectedIcon(next), label: next.name } : undefined,
      prev: prev ? { fn: () => setSelectedIcon(prev), label: prev.name } : undefined
    })
  }, [selectedIcon, filteredIcons, setSelectedIcon])

  if (!selectedIcon) return null

  return (
    <Modal isOpen={true} onClose={() => setSelectedIcon(null)} onNext={navIcons.next} onPrev={navIcons.prev}>
      <IconModal icon={selectedIcon} deviconBranch={deviconBranch} />
    </Modal>
  )
}

export default IconModalSection
