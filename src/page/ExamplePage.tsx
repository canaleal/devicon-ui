import Navbar from "../components/Layout/Navbar"
import Examples from "../features/examples/Examples"

const ExamplePage = () => {

    return (
        <>
            <Navbar />
            <section className="bg-smoke dark:bg-zinc-800 flex flex-col 2xl:flex-row px-16 2xl:px-32 py-16  gap-8 ">
                <Examples />
            </section>

        </>
    )
}

export default ExamplePage