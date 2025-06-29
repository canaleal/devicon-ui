import CodeBlock from '../CodeBlock/CodeBlock.tsx'
import { DEVICON_LINK_TAG } from '../../../constants'
import './styles/cdnBlock.css'

interface CDNBlockLinkProps {
  branch: string
}

export const CDNBlockLink = ({ branch }: CDNBlockLinkProps) => {
  if (branch !== 'master') return null

  return (
    <section className='cdnBlock'>
      <div className='base-container cdnBlock__container'>
        <CodeBlock title='Place this in your Header' code={DEVICON_LINK_TAG} />
      </div>
    </section>
  )
}
