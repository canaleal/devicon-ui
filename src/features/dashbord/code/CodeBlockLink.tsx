import { DeviconBranch } from '../../../types'
import { CodeBlock } from '../../../components/Elements/CodeBlock'
import { DEVICON_LINK_TAG } from '../../../constants'

interface CodeBlockLinkProps {
  deviconBranch: DeviconBranch
}

export const CodeBlockLink = ({ deviconBranch }: CodeBlockLinkProps) => {
  if (deviconBranch !== 'master') return null
  return (
    <CodeBlock code={DEVICON_LINK_TAG}>
      <p className='px-6 py-2 text-white'>Place this in your header (once per HTML file)</p>
    </CodeBlock>
  )
}
