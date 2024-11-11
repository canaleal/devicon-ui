import CodeBlock from '../../../components/Elements/CodeBlock/CodeBlock.tsx'
import { DEVICON_LINK_TAG } from '../../../constants'
import useIconStore from '../../../store/iconStore.ts'
import './styles/cdnBlock.css';

export const CDNBlockLink = () => {
  const deviconBranch = useIconStore((state) => state.deviconBranch)
  if (deviconBranch !== 'master') return null
  return (
  <section className={"cdnBlock slide-in-top"}>
    <div className={"base-container cdnBlock__container"}>
      <CodeBlock title='Place this in your Header' code={DEVICON_LINK_TAG} />
    </div>
  </section>
  )
}
