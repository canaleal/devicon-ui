import { useState } from 'react'

import Tooltip from '../../../../components/Elements/Tooltip/Tooltip'
import { IIconSize } from '../types'
import storage from '../../../../helpers/storage'

interface IconContainerProps {
  iconName: string
  iconSize: IIconSize
  iconUrl: string
}

export const IconImage = ({ iconName, iconSize, iconUrl }: IconContainerProps) => {
  const [isDark, setIsDark] = useState<boolean>(storage.getToken()['isDark'] ?? false)
  const toggleBackground = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={`flex-1 flex flex-col border rounded-lg p-4  h-[30rem] ${isDark ? 'bg-dark-900 text-smoke-100' : ''}`}>
      <img className='m-auto' height={iconSize.height} width={iconSize.width} src={iconUrl} alt={iconName} />
      <Tooltip content='Toggle Background' position='top'>
        <button onClick={toggleBackground} className='p-2 hover:text-yellow-300 flex text-2xl'>
          {isDark ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
        </button>
      </Tooltip>
    </div>
  )
}

export default IconImage
