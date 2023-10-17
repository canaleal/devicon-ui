import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <section className="bg-white dark:bg-zinc-900 dark:text-white  px-32 py-8 flex flex-row gap-4">
            <Link to="/">
                <p className="text-title my-auto text-green-600 ">Devicon</p>
            </Link>



        </section>
    )
}

export default Navbar