import { DEVICON_EXAMPLES } from "./constants/examples"
import ExampleCard from "./widget/ExampleCard"


const Examples = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
      {
        DEVICON_EXAMPLES.map((example) => (
          <ExampleCard key={example.name} deviconExample={example} />
        ))
      }

    </div>
  )
}

export default Examples