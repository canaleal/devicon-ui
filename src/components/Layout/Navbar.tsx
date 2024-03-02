
interface NavbarProps {
    children?: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
    return (
        <section className="bg-white dark:bg-zinc-1000 dark:text-white  px-32 py-5 flex flex-row gap-8 ">
            <p className="my-auto text-5xl font-bold changing-gradient-text p-3">Devicon</p>
            {children}
        </section>
    )
}

export default Navbar;
