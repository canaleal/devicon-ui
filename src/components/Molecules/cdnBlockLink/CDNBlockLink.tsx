import CodeBlock from '../CodeBlock/CodeBlock.tsx'
import { DEVICON_LINK_TAG } from '../../../constants'
import './styles/cdnBlock.css'
import React from 'react'

export const CDNBlockLink = React.memo(() => {
  return (
    <div className='cdnBlock'>
      <CodeBlock title='Place this in your Header' code={DEVICON_LINK_TAG} />
    </div>
  )
})
