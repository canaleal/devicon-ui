import CodeBlock from "../../../../../components/Elements/CodeBlock/CodeBlock"
import { DEVICON_LINK_TAG } from "../../../../../constants"
import useIconStore from "../../../../../store/iconStore"

export const CDNBlockLink = () => {
  const deviconBranch = useIconStore((state) => state.deviconBranch)
  if (deviconBranch !== 'master') return null
  return <CodeBlock title='Place this in your header (once per HTML file)' code={DEVICON_LINK_TAG} />
}
