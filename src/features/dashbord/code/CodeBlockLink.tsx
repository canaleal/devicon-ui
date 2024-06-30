import { DeviconBranch } from '../../../types'
import { CodeBlock } from '../../../components/Elements/CodeBlock'
import { DEVICON_LINK_TAG } from '../../../constants'

interface CodeBlockLinkProps {
  deviconBranch: DeviconBranch
}

export const CodeBlockLink = ({ deviconBranch }: CodeBlockLinkProps) => {
  if (deviconBranch !== 'master') return null
  return <CodeBlock title='Place this in your header (once per HTML file)' code={DEVICON_LINK_TAG} />
}
