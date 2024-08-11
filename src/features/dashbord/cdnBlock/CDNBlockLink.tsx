import { DeviconBranch } from '../../../types'
import { CodeBlock } from '../../../components/Elements/CodeBlock'
import { DEVICON_LINK_TAG } from '../../../constants'

interface CDNBlockLinkProps {
  deviconBranch: DeviconBranch
}

export const CDNBlockLink = ({ deviconBranch }: CDNBlockLinkProps) => {
  if (deviconBranch !== 'master') return null
  return <CodeBlock title='Place this in your header (once per HTML file)' code={DEVICON_LINK_TAG} />
}
